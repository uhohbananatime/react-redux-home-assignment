import React, { useState } from 'react';
import { useSelector } from 'react-redux';


import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ITEMS } from './data';
import './App.css';

// Bootstrap icons 
import { CircleFill, ThreeDotsVertical, Kanban } from 'react-bootstrap-icons';

// Reusable array headings for mobile purposes
const headings = ['Worker ID', 'Worker Name', 'Overtime', 'Manual Hours', 'Hours', 'Total Hours']

// Use this to drag/reorder rows
const DragHandle = SortableHandle(() => (
    <ThreeDotsVertical size={24} color="darkgray" />
));

// Items to display, including stats icon and drag handle
const SortableItem = SortableElement(({ value }) => (
    <tr>
        <td scope="row" data-label={headings[0]} className="td-id">{value.id}</td>
        <td data-label={headings[1]} className="td-worker-name"><CircleFill color={`${value.status ?? 'red'}`} size={10} />&nbsp;&nbsp;{value.workerName}</td>
        <td data-label={headings[2]}>{value.extraHours}</td>
        <td data-label={headings[3]}>{value.manualHours}</td>
        <td data-label={headings[4]}>{value.hours}</td>
        <td data-label={headings[5]}>{value.totalHours}</td>
        <td data-label="View employee related statistics"><a href=""><Kanban size={24} color="darkgray" style={{transform: 'rotate(180deg)'}} /></a></td>
        <td className="drag"><DragHandle /></td>
    </tr>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <table>
            <thead>
                {headings.map((heading, i) => (
                    <th key={`th-${i}`} scope="col">{heading}</th>
                ))}
                <th className="" colSpan="2">Actions</th>
            </thead>
            <tbody>
                {items.map((value, index) => (
                    <SortableItem
                        key={`item-${value.workerName}`}
                        index={index}
                        value={value}
                    />
                ))}
            </tbody>
            
        </table>
    );
});

function SortableComponent() {
    const birds = useSelector(state => state.birds);

    const [data, setData] = useState(ITEMS);

    let onSortEnd = ({ oldIndex, newIndex }) => {
        setData(() => arrayMove(data, oldIndex, newIndex));
    };

    return (
        // Table
        <div className="table-container">
            <SortableList items={data} onSortEnd={onSortEnd} useDragHandle={true} />

            <hr />
            <ul>
                {birds.map(bird => (
                    <li key={bird.name}>
                        <h3>{bird.name}</h3>
                        <div>
                        Views: {bird.views}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SortableComponent;