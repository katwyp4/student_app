import React, {useEffect, useState} from 'react';
import {Badge, Button, Calendar, Col, ConfigProvider, Divider, Input, Modal, Row,  TimePicker, message} from 'antd';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import plPl from 'antd/es/locale/pl_PL'
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import TextArea from "antd/es/input/TextArea";
dayjs.locale('pl');

let isAdmin = true;
let dayEvent = [];
let eventKey = 1;
function EventDetails({ details }) {
    return (
        <div style={{ whiteSpace: 'pre-line' }}>
            {details.split('\n').map((line, index) => {
                const [label, ...rest] = line.split(':');
                return label && rest.length ? (
                    <p key={index}>
                        <strong>{label}:</strong> {rest.join(':')}
                    </p>
                ) : (
                    <p key={index}>{line}</p>
                );
            })}
        </div>
    );
}

function DisplayForm({ label, value, onChange, placeholder, disabled, showError, useTextArea, isTimePicker }) {
    const format = 'HH:mm';
    return (
        <Row gutter={[16, 16]} style={{ marginBottom: '15px' }}>
            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0 }}>{label}:</p>
            </Col>
            <Col span={20}>
                {isTimePicker ? (
                        <TimePicker
                            minuteStep={15}
                            format={format}
                            value={value ? dayjs(value, format) : null}
                            onChange={(time, timeString) => onChange(timeString)}
                            style={{ marginBottom: '10px', borderColor: showError && !value ? 'red' : null }}
                            disabled={disabled}
                        />
                ) :
                useTextArea ? (
                    <TextArea
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onPressEnter={(e) => e.preventDefault()}
                        autoSize={{ minRows: 1, maxRows: 10 }}
                        style={{ marginBottom: '10px', borderColor: showError && !value ? 'red' : null }}
                        disabled={disabled}
                    />
                ) : (
                    <Input
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        style={{ marginBottom: '10px', borderColor: showError && !value ? 'red' : null }}
                        disabled={disabled}
                    />
                )}
            </Col>
        </Row>
    );
}
export default function Calendar_fun(){
    let navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedMonthTxt, setSelectedMonthTxt] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');

    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const handleCreateButtonClick = () => {
        setShowDescriptionInput(true);
        if(content && description && time && location)
        {
            if (isTimeInValidRange(time)) {
                handleCreateEvent();
            } else {
                message.error('Niepoprawny zakres godzin.');
            }
        }
        else
        {
            if (showDescriptionInput) {
                setShowErrorMessage(true);
            }
        }
    };
    const handleCreateEvent = () => {
        const newEvent = {
            key: eventKey++,
            year: selectedYear,
            month: selectedMonth,
            day: selectedDay,
            type: "success",
            content: content,
            details: `Opis: ${description}\nGodzina: ${time}\nMiejsce: ${location}`
        };
        dayEvent.push(newEvent);
        resetForm();
        setIsModalOpen(false);
        setShowDescriptionInput(false);
        setShowErrorMessage(false);
    };

    const isTimeInValidRange = (time) => {
        const format = 'HH:mm';
        const minTime = dayjs('08:00', format);
        const maxTime = dayjs('21:00', format);
        const inputTime = dayjs(time, format);
        return inputTime.isAfter(minTime) && inputTime.isBefore(maxTime);
    };
    const resetForm = () => {
        setContent('');
        setDescription('');
        setTime('');
        setLocation('');
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setShowDescriptionInput(false);
        setShowErrorMessage(false);
        resetForm();
    };
    const onSelect = (value) => {
        if(selectedMonth===value.month()+1 && selectedYear === value.year()) setIsModalOpen(true);
        setSelectedDay(value.date());
        setSelectedMonth(value.month()+1);
        setSelectedMonthTxt(value.format('MMMM'));
        setSelectedYear(value.year());
        setShowErrorMessage(false);

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
        .ant-radio-group {
          display: none;
        }
        .ant-picker-calendar-full .ant-picker-calendar-header {
            position: sticky;
            top: 0px;
            z-index: 3;
            background-color: #f5f5f5; 
        }
        
        .calendar-header {
            position: sticky;
            top: 0;
            z-index: 1000;
            height: 150px;
            background-color: #882220;
            display: flex;
            flex-direction: column;
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
            top: 50px;
            left: 30px;
            cursor: pointer;
            font-size: 24px;
            color: #FFFFFF;
        }
        
        .calendar-content {
            height: calc(100vh - 130px);
            overflow-y: auto;
        }
        
        .week-days {
            display: flex;
            justify-content: space-around;
            width: calc(100% - 40px);
            font-size: 17px;
            background-color: #882220;
            color: #FFFFFF;
            margin-top: 60px;
        }
        
        .calendar-content {
            height: calc(100vh - 160px);
            overflow-y: auto;
        }
        
        .ant-picker-content th {
            display:none;
        }
        
      `}</style>
            <div className="calendar-header">
                <div className="back-button" onClick={handleBackToMenu}>
                    <BiArrowBack/>
                </div>
                Kalendarz
                <div className="week-days">
                    <span>Pn</span>
                    <span>Wt</span>
                    <span>Śr</span>
                    <span>Cz</span>
                    <span>Pt</span>
                    <span>Sb</span>
                    <span>Nd</span>
                </div>
            </div>

            <div className="calendar-content">
                <Calendar cellRender={cellRender} onSelect={onSelect}/>
            </div>
            <Modal title={selectedDay && selectedMonthTxt ? `${selectedDay} ${selectedMonthTxt}` : 'Basic Modal'}
                   open={isModalOpen} onOk={handleOk} onCancel={handleCancel}

                   footer={isAdmin ? [
                       <Button key="cancel" onClick={handleCancel}>
                           Anuluj
                       </Button>,
                       <Button key="create" type="primary" onClick={handleCreateButtonClick}>
                           Utworz
                       </Button>
                   ] : null}
            >
                {showDescriptionInput && (
                    <>
                        <DisplayForm
                            label="Nagłówek"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Nagłówek"
                            disabled={!showDescriptionInput}
                            showError={showErrorMessage}
                            useTextArea={true}
                            isTimePicker={false}
                        />
                        <DisplayForm
                            label="Opis"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Opis"
                            disabled={!showDescriptionInput}
                            showError={showErrorMessage}
                            useTextArea={true}
                            isTimePicker={false}
                        />
                        <DisplayForm
                            label="Godzina"
                            value={time}
                            onChange={setTime}
                            disabled={!showDescriptionInput}
                            showError={showErrorMessage}
                            useTextArea={false}
                            isTimePicker={true}

                        />
                        <DisplayForm
                            label="Miejsce"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Miejsce"
                            disabled={!showDescriptionInput}
                            showError={showErrorMessage}
                            useTextArea={false}
                            isTimePicker={false}
                        />

                    </>
                )}
                {showErrorMessage && <p style={{ color: 'red' }}>Nie wszystkie pola zostały wypełnione</p>}
                {getListData(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`)).map((event, index) => (
                    <div key={index}>
                        <h2>{event.content}</h2>
                        <EventDetails details={event.details}/>
                        {index!==getListData(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`)).length-1 && <Divider/>}
                    </div>
                ))}
            </Modal>
        </ConfigProvider>
    );
};