import React from 'react';
import { Badge, Calendar } from 'antd';

export default function Calendar_fun(){
    let dayEvent = [
        {
            year: 2024,
            month: 8,
            day: 24,
            type: "success",
            content: "Example 1"
        },
        {
            year: 2024,
            month: 8,
            day: 25,
            type: "success",
            content: "Example 2"
        },
        {
            year: 2024,
            month: 9,
            day: 15,
            type: "success",
            content: "Example 3"
        },
        {
            year: 2023,
            month: 9,
            day: 15,
            type: "success",
            content: "Example 4"
        }
    ]
    const getListData = (value) => {
       const listData = dayEvent.filter(event =>
           event.year === value.year() &&
           event.month === value.month() &&
           event.day === value.date()
       );
        return listData || [];
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <div>
            <style>{`
        .ant-picker-calendar-full .ant-picker-calendar-header .ant-radio-group {
          display: none;
        }
      `}</style>
            <Calendar dateCellRender={dateCellRender} />
        </div>
    );
};


