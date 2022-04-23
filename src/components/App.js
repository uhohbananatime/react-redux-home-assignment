import React, { useState } from 'react';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ITEMS } from './data';
// import 'bootstrap-icons'
import { CircleFill, ThreeDotsVertical, Kanban } from 'react-bootstrap-icons';
import './App.css';

// Reusable array headings for mobile purposes
const headings = ['Worker ID', 'Worker Name', 'Overtime', 'Manual Hours', 'Hours', 'Total Hours']

const DragHandle = SortableHandle(() => (
    <ThreeDotsVertical size={24} color="darkgray" />
  ));

const SortableItem = SortableElement(({ value }) => (
    <tr>
        <td scope="row" data-label={headings[0]} className="td-id">{value.id}</td>
        <td data-label={headings[1]} className="td-worker-name"><CircleFill color={`${value.status ?? 'red'}`} size={10} />&nbsp;&nbsp;{value.workerName}</td>
        <td data-label={headings[2]}>{value.extraHours}</td>
        <td data-label={headings[3]}>{value.manualHours}</td>
        <td data-label={headings[4]}>{value.hours}</td>
        <td data-label={headings[5]}>{value.totalHours}</td>
        <td width="45"><Kanban size={24} color="darkgray" style={{transform: 'rotate(180deg)'}} /></td>
        <td width="45" className="drag"><DragHandle /></td>
    </tr>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <table>
            <thead>
                {headings.map((heading, i) => (
                    <th key={`th-${i}`} scope="col">{heading}</th>
                ))}
                <th width="45" className="">&nbsp;</th>
                <th width="45" className="">&nbsp;</th>
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
    const [data, setData] = useState(ITEMS);

    let onSortEnd = ({ oldIndex, newIndex }) => {
        setData(() => arrayMove(data, oldIndex, newIndex));
    };

    return (
        <div className="table-container">
            <SortableList items={data} onSortEnd={onSortEnd} useDragHandle={true} />
        </div>
    );
}

export default SortableComponent;