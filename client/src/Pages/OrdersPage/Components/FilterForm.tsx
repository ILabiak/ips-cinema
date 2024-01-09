import { ChangeEvent, useEffect, useState } from "react";
import { getViewers } from "../../../services/viewers";
import { getTickets } from "../../../services/tickets";

interface FilterFormProps {
  addFilter(name: string, data: string): void,
  deleteFilter(name: string): void,
  hasFilter(name: string): boolean
}

export default function FilterForm(props: FilterFormProps) {
  const { addFilter, deleteFilter, hasFilter } = props;
  const defaultFormData = {
    currentDate: '',
    currentFullName: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [dates, setDates] = useState<string[]>([]);
  const [fullNames, setFullNames] = useState<string[]>([]);
  const [filterByViewer, setFilterByViewer] = useState<boolean>(false);
  const [filterByDate, setFilterByDate] = useState<boolean>(false);

  useEffect(() => {
    getViewers().then(viewers => setFullNames(Array.from(new Set(viewers.map(viewer => viewer.full_name)))));
    getTickets().then(tickets => setDates(Array.from(new Set(tickets.map(ticket => ticket.date)))));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === 'filterByViewer') {
      handleSwitchFilterByViewer(formData.currentFullName);
      setFilterByViewer(prevFilterByViewer => !prevFilterByViewer);
    }

    if (name === 'filterByDate') {
      setFilterByDate(prevFilterByDate => !prevFilterByDate);
      handleSwitchFilterByDate(formData.currentDate);
    }
  };

  const handleSwitchFilterByViewer = (dataId: string) => {
    const filterName = 'byViewer';
    if (!dataId) return;
    if (!filterByViewer && !hasFilter(filterName)) {
      addFilter(filterName, formData.currentFullName);
      return;
    }
    deleteFilter(filterName);
  }

  const handleSwitchFilterByDate = (dataId: string) => {
    const filterName = 'byDate';
    if (!dataId) return;
    if (!filterByDate && !hasFilter(filterName)) {
      addFilter(filterName, formData.currentDate);
      return;
    }
    deleteFilter(filterName);
  }

  return (
    <form className="add-form">
       <div className="add-field">
        <select 
          className="add-input"  
          name="currentFullName" 
          value={formData.currentFullName}
          onChange={handleChange}
        >
          <option value="" disabled>Виберіть глядача</option>
          {fullNames?.map(fullName => <option value={fullName}>{fullName}</option>)}
        </select>
        <select 
          className="add-input"  
          name="currentDate" 
          value={formData.currentDate}
          onChange={handleChange}
        >
          <option value="" disabled>Виберіть дату</option>
          {dates?.map(date => <option value={date}>{date}</option>)}
        </select>
      </div>
      <div className="add-field">
        <div className="add-input">
          <label htmlFor="filterByViewer">Фільтрувати за глядачем </label>
          <input 
            type="checkbox" 
            id="filterByViewer"
            name="filterByViewer"
            checked={filterByViewer}
            onChange={handleCheckboxChange} />
        </div>
        <div className="add-input">
          <label htmlFor="filterByDate">Фільтрувати за датою </label>
          <input 
            type="checkbox" 
            id="filterByDate" 
            name="filterByDate"
            checked={filterByDate}
            onChange={handleCheckboxChange} />
        </div>
      </div>
    </form>
  )
}
