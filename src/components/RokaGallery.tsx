import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-react';

// Photos added from the page live in this browser's IndexedDB. For photos that
// should be visible to everyone, add images to public/roka and list them in photos.json.
const DB_NAME = 'pratha-abhinav-roka-gallery';
const STORE_NAME = 'photos';
interface Photo { id: string; name: string; url: string; local?: boolean }

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function readPhotos(): Promise<Array<{ id: string; name: string; blob: Blob }>> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}
async function writePhoto(photo: { id: string; name: string; blob: Blob }) {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(photo);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}
async function deletePhoto(id: string) {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

export const RokaGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const base = import.meta.env.BASE_URL;
        const response = await fetch(`${base}roka/photos.json`);
        const manifest: unknown = response.ok ? await response.json() : [];
        const names: string[] = Array.isArray(manifest) ? manifest : [];
        const bundled = names.filter(name => typeof name === 'string' && !name.includes('/') && !name.includes('..'))
          .map((name, index) => ({ id: `bundled-${index}`, name, url: `${base}roka/${encodeURIComponent(name)}` }));
        const stored = await readPhotos();
        if (!active) return;
        const local = stored.map(photo => {
          const url = URL.createObjectURL(photo.blob);
          urlsRef.current.push(url);
          return { id: photo.id, name: photo.name, url, local: true };
        });
        setPhotos([...bundled, ...local]);
      } catch {
        if (active) setError('Photos could not be loaded. Please check that your browser allows local storage.');
      }
    };
    void load();
    return () => { active = false; urlsRef.current.forEach(url => URL.revokeObjectURL(url)); urlsRef.current = []; };
  }, []);

  const addPhotos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length) return;
    setBusy(true); setError('');
    try {
      const additions: Photo[] = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const id = crypto.randomUUID();
        await writePhoto({ id, name: file.name, blob: file });
        const url = URL.createObjectURL(file);
        urlsRef.current.push(url);
        additions.push({ id, name: file.name, url, local: true });
      }
      setPhotos(prev => [...prev, ...additions]);
    } catch {
      setError('Unable to save photos. Check available browser storage space and try again.');
    } finally { setBusy(false); }
  };

  const removePhoto = async (photo: Photo) => {
    if (!photo.local) return;
    try {
      await deletePhoto(photo.id);
      setSelected(null);
      setPhotos(prev => prev.filter(item => item.id !== photo.id));
      URL.revokeObjectURL(photo.url);
      urlsRef.current = urlsRef.current.filter(url => url !== photo.url);
    } catch { setError('Could not remove this photo. Please try again.'); }
  };
  const prev = useCallback(() => setSelected(i => i === null ? null : (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setSelected(i => i === null ? null : (i + 1) % photos.length), [photos.length]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (selected === null) return;
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [selected, prev, next]);
  const current = selected !== null ? photos[selected] : null;

  return (
    <section id="roka" className="py-20 lg:py-28 bg-[#F5EFE6] border-y border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-editorial text-sm uppercase tracking-[0.25em] text-[#9A7426] mb-3">A Beautiful Beginning</p>
          <h2 className="text-4xl sm:text-5xl font-display text-[#2C241E]">Our Roka Moments</h2>
          <p className="mt-4 text-[#6B5A4B]">A special day, treasured forever. Explore the joyful moments from our Roka ceremony.</p>
          
        </div>
        {photos.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {photos.map((photo, index) => (
              <button key={photo.id} onClick={() => setSelected(index)} className="group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl border border-[#C5A059]/30 bg-white shadow-sm hover:shadow-xl transition-shadow" aria-label={`View Roka photo ${index + 1}: ${photo.name}`}>
                <img src={photo.url} alt={`Roka celebration – ${photo.name}`} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white text-xs text-left opacity-0 group-hover:opacity-100 transition-opacity">View Photo</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center border-2 border-dashed border-[#C5A059]/40 bg-white/60 rounded-3xl px-6 py-16">
            <Camera className="mx-auto w-12 h-12 text-[#C5A059]" />
            <h3 className="mt-5 font-display text-2xl text-[#2C241E]">Your Roka Memories Belong Here</h3>
            <p className="mt-3 text-sm text-[#6B5A4B]">Click “Add Roka Photos” to start your beautiful gallery.</p>
          </div>
        )}
      </div>
      {current && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label="Roka photo viewer">
          <button onClick={() => setSelected(null)} className="absolute top-5 right-5 text-white p-2" aria-label="Close photo"><X /></button>
          <button onClick={event => { event.stopPropagation(); prev(); }} className="absolute left-3 sm:left-8 text-white p-2" aria-label="Previous photo"><ChevronLeft size={30} /></button>
          <img src={current.url} alt={current.name} className="max-w-[85vw] max-h-[80vh] object-contain rounded-lg" onClick={event => event.stopPropagation()} />
          <button onClick={event => { event.stopPropagation(); next(); }} className="absolute right-3 sm:right-8 text-white p-2" aria-label="Next photo"><ChevronRight size={30} /></button>
          <div className="absolute bottom-5 flex items-center gap-5 text-white text-sm">
            <span>{selected! + 1} / {photos.length}</span>
            {current.local && <button onClick={event => { event.stopPropagation(); void removePhoto(current); }} className="flex gap-2 items-center text-red-200 hover:text-white"><Trash2 size={16} /> Remove photo</button>}
          </div>
        </div>
      )}
    </section>
  );
};
