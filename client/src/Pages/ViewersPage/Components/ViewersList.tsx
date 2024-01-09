import ViewerItem from "./ViewerItem";
import Viewer from "../../../interfaces/viewer.interface";

interface ViewerListProps {
  viewers: Viewer[],
  deleteViewer(id: string): void,
  updateViewer(id: string, data: Partial<Viewer>, file: File | null): void,
}

export default function ViewerList(props: ViewerListProps) {
  const { viewers, deleteViewer, updateViewer } = props;

  return (
    <ul className="list">{ 
        viewers.length ? 
        viewers.map((viewer) => (
          <ViewerItem key={viewer._id} viewer={viewer} onDelete={deleteViewer} onUpdate={updateViewer} />
        )) :
        <div className="list-empty">Глядачів нема!</div>
      }
    </ul>
  );
};