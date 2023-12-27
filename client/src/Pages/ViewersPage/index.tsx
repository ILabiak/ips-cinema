import { useEffect, useState } from "react";
import { serverURL } from "../../constants";
import Viewer from "../../interfaces/viewer.interface";
import ViewerList from "./Components/ViewersList";
import AddViewerForm from "./Components/AddViewerForm";

export default function ViewersPage() {
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const url = `${serverURL}/viewers`;

  useEffect(() => {
    const handleFetchViewers = async () => {
      const response: Response = await fetch(url);
      const data: Viewer[] = await response.json();
      console.log(data)
      setViewers(data.reverse());
    }

    handleFetchViewers();
  }, [url]);

  const addViewer = (viewer: Viewer, file: File | null): void => {
    const fData = new FormData();
    fData.append('file', file!);
    type F = keyof Viewer;

    for (const key of Object.keys(viewer) as F[]) {
      fData.append(key, String(viewer[key]));
    }

    fetch(url, {
      method: 'POST',
      body: fData,
    });
    setViewers(prevViewers => [viewer, ...prevViewers]);
  };

  const updateViewer = (id: string, data: Partial<Viewer>, file: File | null) => {
    const fData = new FormData();
    fData.append('file', file!);
    type F = keyof Viewer;

    for (const key of Object.keys(data) as F[]) {
      if (key !== 'image') {
        fData.append(key, String(data[key]));
      }
    }

    fetch(`${url}/${id}`, {
      method: 'PATCH',
      body: fData,
    });
    
    const updatedViewers = viewers.map(viewer => {
      if (viewer._id === id) return {...viewer, ...data};
      return viewer;
    })
    setViewers(updatedViewers);
  }

  const deleteViewer = (id: string): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setViewers(viewers.filter(viewer => viewer._id !== id));
  }

  return (
    <>
      <AddViewerForm addViewer={addViewer} />
      <ViewerList viewers={viewers} deleteViewer={deleteViewer} updateViewer={updateViewer}/>
    </>
  );
};