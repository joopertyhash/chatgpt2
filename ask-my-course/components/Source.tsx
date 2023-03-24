import { Modal } from "flowbite-react";
import { useState } from "react";

export default function Source({ index, page, page_content, source, start_time, title }: { index?: number, page?: string, page_content?: string, source?: string, start_time?: number, title?: string }) {

  const [visible,setVisible]=useState(false)

  const toHoursAndMinutes = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const hours = Math.floor(totalMinutes / 60);

    let start_idx = 14
    if (hours) {
      start_idx = 11
    }
    return new Date(totalSeconds * 1000).toISOString().slice(start_idx, 19);
  }

  const parsed_content = page_content?.replace(/↓/g,'\n');
  const embed_source = source?.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
  let t_start = 0
  if (start_time){
    t_start = Math.round(    start_time / 1000)
  }
  return (
     <div key={index} >
    <p className="text-left pt-2  text-blue-600 hover:underline" onClick={()=>setVisible(true)}>
      🧠 Source {index}: {title || source}  - {toHoursAndMinutes(t_start)}
    </p>
    {typeof document !== 'undefined'  && (<Modal
      show={visible}
      size="6xl"
      onClose={()=>setVisible(false)}
    >
      <Modal.Header>
      {title || source}  - {toHoursAndMinutes(t_start)}
              </Modal.Header>
      <Modal.Body>
        <div className="flex flex-row space-x-6">
          <div className="space-y-6">
            <span className="text-2xl font-bold dark:text-white">Transcript</span> 
            <p className="text-base dark:text-gray-400">...{parsed_content}...</p>
          </div>
          <div className="flex-initial space-y-6">
          <span className="text-2xl font-bold dark:text-white">Source</span> 
            <br/>
          <iframe 
    width="560" 
    height="315" 
    src={`${embed_source}?showinfo=0&start=${t_start}`}
    allow-data="autoplay; encrypted-media" 
    allowFullScreen/>
    </div>
        </div>
      </Modal.Body>
    </Modal>)}
  </div> 
  );
}
