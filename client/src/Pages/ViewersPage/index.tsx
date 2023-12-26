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
      setViewers(data.reverse());
    }

    handleFetchViewers();
  }, [url]);

  const addViewer = (viewer: Viewer): void => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(viewer),
    });
    setViewers(prevViewers => [viewer, ...prevViewers]);
  };

  const updateViewer = (id: string, data: Partial<Viewer> ) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
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