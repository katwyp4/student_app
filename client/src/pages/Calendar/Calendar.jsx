import React, {useEffect, useState} from 'react';
import {Badge, Calendar, ConfigProvider, Modal} from 'antd';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import plPl from 'antd/es/locale/pl_PL'
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
dayjs.locale('pl');

let dayEvent = [
    {
        year: 2024,
        month: 5,
        day: 21,
        type: "success",
        content: "Example 0",
        details: "Cos tam cos tam"
    },
    {
        year: 2024,
        month: 5,
        day: 21,
        type: "success",
        content: "Example 0.1",
        details: "Cos tam cos tam"
    },
    {
        year: 2024,
        month: 9,
        day: 24,
        type: "success",
        content: "Example 1",
        details: "Cos tam cos tam2222"
    },
    {
        year: 2024,
        month: 9,
        day: 25,
        type: "success",
        content: "Example 2",
        details: "Cos tam cos tam2222333"
    },
    {
        year: 2024,
        month: 10,
        day: 15,
        type: "success",
        content: "Example 3",
        details: "Cos tam cos tam1243rwer"
    },
    {
        year: 2023,
        month: 9,
        day: 15,
        type: "success",
        content: "Example 4",
        details: "Cos tam cos tam LOREM"
    }
]
export default function Calendar_fun(){
    let navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedMonthTxt, setSelectedMonthTxt] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSelect = (value) => {
        if(selectedMonth===value.month()+1 && selectedYear === value.year()) setIsModalOpen(true);
        setSelectedDay(value.date());
        setSelectedMonth(value.month()+1);
        setSelectedMonthTxt(value.format('MMMM'));
        setSelectedYear(value.year());

    };

    useEffect(() => {
        document.body.style.background = '#f5f5f5'
    }, []);

    const handleBackToMenu = () => {
        navigate('/menu');
    };

    const getListData = (value) => {
        const listData = dayEvent.filter(event =>
            event.year === value.year() &&
            event.month === (value.month()+1) &&
            event.day === value.date()
        );
        return listData || [];
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <Badge status={item.type} text={item.content}/>
                ))}
            </ul>
        );
    };
    const cellRender = (current) => {
        return dateCellRender(current);
    };
    return (
        <ConfigProvider locale={plPl}
                        theme={{
                            components: {
                                Calendar: {
                                    fullBg: '#f5f5f5',

                                },
                            },
                            token: {
                                controlHeightSM: 10,
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
        
        .back-button {
            position: absolute;
            top: 20px;
            left: 20px;
            cursor: pointer;
            font-size: 24px;
            color: #FFFFFF;
        }
      `}</style>
            <div className="calendar-header">
                <div className="back-button" onClick={handleBackToMenu}>
                    <BiArrowBack/>
                </div>
                Kalendarz
            </div>
            <Calendar cellRender={cellRender} onSelect={onSelect}/>
            <Modal title={selectedDay && selectedMonthTxt ? `${selectedDay} ${selectedMonthTxt}` : 'Basic Modal'}
                   open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {getListData(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`)).map((event, index) => (
                    <div key={index}>
                        <p>{event.content}</p>
                        <p>{event.details}</p>
                    </div>
                ))}
            </Modal>
        </ConfigProvider>
    );
};