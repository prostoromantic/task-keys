import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState(props.initialData);
    const [, setSorting] = useState(props.sorting);
    const [id, setId] = useState(-1);
    const [isEdit, setThatEdit] = useState(false);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        switch (props.sorting) {
            case 'ASC':
                setItems(items.sort((a, b) => a.id - b.id));
                setSorting(props.sorting);
                break;
            case 'DESC':
                setItems(items.sort((a, b) => b.id - a.id));
                setSorting(props.sorting);
                break;
        }
    }, [props.sorting, items]);

    return (
        <div>
            {items.map((item) => {
                if (!isEdit || item.id !== id)
                    return (
                        <div
                            onClick={(e) => {
                                setThatEdit(true);
                                setId(item.id);
                            }}
                        >
                            {item.name}
                        </div>
                    );
                else
                    return (
                        <input
                            type="text"
                            defaultValue={item.name}
                            onChange={(e) => {
                                setNewValue(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    items.map((changedItem) => {
                                        if (item.id === changedItem.id)
                                            changedItem.name = newValue;
                                    });
                                    setThatEdit(false);
                                    setItems(items);
                                }
                                if (e.key === 'Escape') setThatEdit(false);
                            }}
                            key={item.id}
                        ></input>
                    );
            })}
        </div>
    );
}
