import React, { useEffect } from 'react';
import {Badge, Calendar, ConfigProvider} from 'antd';

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
export default function Calendar_fun(){

    useEffect(() => {
        document.body.style.background = '#f5f5f5'
    }, []);

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
        <ConfigProvider
            theme={{
                components: {
                    Calendar: {
                        fullBg: '#f5f5f5',
                    },
                },
            }}
        >
            <style>{`
        .ant-picker-calendar-full .ant-picker-calendar-header .ant-radio-group {
          display: none;
        }
        .calendar-header {
            height: 130px;
            background-color: #882220;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
            color: #FFFFFF;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
            font-family: 'Readex Pro', sans-serif;
        }
      `}</style>
            <div className="calendar-header">Kalendarz</div>
            <Calendar dateCellRender={dateCellRender} />
        </ConfigProvider>
    );
};


