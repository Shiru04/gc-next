"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const photos = [
 ["outdoor-front", "American Standard outdoor unit beside a home", "Unidad exterior American Standard junto a una vivienda"],
 ["attic-system", "Indoor HVAC equipment, duct connections and drain lines in an attic", "Equipo HVAC interior, conexiones de conductos y drenajes en un ático"],
 ["platinum-angle", "Outdoor unit, equipment pad and adjacent wall", "Unidad exterior, base del equipo y pared adyacente"],
 ["home-unit", "Outdoor equipment beside a shingle-sided home", "Equipo exterior junto a una vivienda con revestimiento de tejas"],
 ["platinum-front", "Front view of an American Standard Platinum Series unit", "Vista frontal de una unidad American Standard Platinum Series"],
 ["outdoor-side", "Side view of an outdoor unit and its base", "Vista lateral de una unidad exterior y su base"],
 ["platinum-side", "Outdoor equipment and electrical connection", "Equipo exterior y conexión eléctrica"],
 ["home-context", "Two outdoor units beside a residential building", "Dos unidades exteriores junto a un edificio residencial"],
];

export function MediaGallery({ locale = "en" }: { locale?: "en" | "es" }) {
 const es = locale === "es"; const [index,setIndex]=useState(0); const dialog=useRef<HTMLDialogElement>(null); const trigger=useRef<HTMLButtonElement | null>(null);
 const move=(amount:number)=>setIndex(i=>(i+amount+photos.length)%photos.length);
 const close=()=>{dialog.current?.close();trigger.current?.focus();};
 return <section className="gc-section gc-wrap gc-media-gallery" aria-labelledby="gc-gallery-heading">
  <div className="gc-gallery-heading"><h2 id="gc-gallery-heading">{es ? "Los Detalles También Cuentan" : "The Details Matter Too"}</h2><p>{es ? "Explore las fotografías compartidas por GC: equipos exteriores, conexiones y sistemas en ático." : "Explore photographs shared by GC: outdoor equipment, connections and attic systems."}</p></div>
  <div className="gc-gallery-grid">{photos.map(([name,en,spanish],i)=><button type="button" key={name} onClick={e=>{trigger.current=e.currentTarget;setIndex(i);dialog.current?.showModal();}} aria-label={`${es ? "Ampliar" : "Enlarge"}: ${es?spanish:en}`}><Image src={`/projects/gc/${name}.webp`} alt={es?spanish:en} width={768} height={1024} sizes="(max-width: 767px) 75vw, 25vw"/><span>{es ? "Ver fotografía" : "View photograph"}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/></svg></span></button>)}</div>
  <p className="gc-gallery-hint">{es ? "Seleccione una fotografía para verla completa." : "Select a photograph to see the full image."}</p>
  <dialog className="gc-gallery-dialog" ref={dialog} aria-label={es?"Galería de fotografías":"Photograph gallery"} onCancel={e=>{e.preventDefault();close();}} onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}}>
   <div className="gc-gallery-toolbar"><span aria-live="polite">{index+1} / {photos.length}</span><button type="button" onClick={close}>{es?"Cerrar":"Close"}</button></div>
   <Image src={`/projects/gc/${photos[index][0]}.webp`} alt={photos[index][es?2:1]} width={768} height={1024} sizes="90vw"/>
   <p>{photos[index][es?2:1]}</p><div className="gc-gallery-controls"><button type="button" onClick={()=>move(-1)}>{es?"Anterior":"Previous"}</button><button type="button" onClick={()=>move(1)}>{es?"Siguiente":"Next"}</button></div>
  </dialog>
 </section>;
}

export function FieldVideos({ locale="en" }: {locale?:"en"|"es"}) {const es=locale==="es";return <section className="gc-section gc-wrap gc-field-videos"><div><h2>{es?"Mírelo De Cerca":"Take A Closer Look"}</h2><p>{es?"Recorridos breves del equipo y su ubicación, compartidos por GC. Reproduzca cada video a su ritmo.":"Short views of the equipment and its surroundings, shared by GC. Play each video at your own pace."}</p><p className="gc-video-note">{es?"Videos sin audio. Las descripciones aparecen debajo.":"Videos have no audio. Descriptions appear below."}</p></div><div className="gc-video-pair">{[1,3].map((n,i)=><figure key={n}><video controls playsInline preload="none" poster={`/projects/gc/video-${n}-poster.webp`} aria-label={es?(i?"Vista de unidad Platinum Series":"Vista de equipo junto a vivienda"):(i?"Platinum Series equipment view":"Equipment beside a home")}><source src={`/projects/gc/field-${n}.mp4`} type="video/mp4"/></video><figcaption>{es?(i?"Unidad exterior American Standard Platinum Series y su base.":"Recorrido alrededor de una unidad exterior junto a una vivienda."):(i?"American Standard Platinum Series outdoor unit and its base.":"A view around an outdoor unit beside a home.")}</figcaption></figure>)}</div></section>}
