import {useNavigate} from "react-router-dom";
import {BiArrowBack, BiEditAlt} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Row,
    Select,
    Space,
    TimePicker
} from "antd";
import dayjs from "dayjs";

let isAdmin = true;

let Events = [
    {
        key: 0,
        Day: 0,
        Title: "Podstawy inżynerii oprogramowania",
        Place: "i24 B19 403",
        Lektor: "Kowalski J",
        From: 12,
        To: 14,
        Type: "l",
    },

    {
        key: 1,
        Day: 3,
        Title: "Systemy wbudowane",
        Place: "k22 B18 I.M",
        Lektor: "Kowalski J",
        From: 8,
        To: 11,
        Type: "l",
    },

    {
        key: 2,
        Day: 0,
        Title: "Jezyk Obcy",
        Place: "_B24",
        Lektor: "Kowalski J",
        From: 8,
        To: 10,
        Type: "lekt",
    },

    {
        key: 3,
        Day: 1,
        Title: "Bazy Danych",
        Place: "E2",
        Lektor: "Kowalski J",
        From: 10,
        To: 12,
        Type: "w",
    },
    {
        key: 4,
        Day: 1,
        Title: "Komunikacja człowiek-komputer",
        Place: "E2",
        Lektor: "Kowalski J",
        From: 12,
        To: 14,
        Type: "w",
    },
    {
        key: 5,
        Day: 1,
        Title: "Podstawy inżynerii oprogramowania",
        Place: "E2",
        Lektor: "Kowalski J",
        From: 14,
        To: 16,
        Type: "w",
    },
    {
        key: 6,
        Day: 1,
        Title: "Programowanie obiektowe || (Java)",
        Place: "Zdalnie",
        Lektor: "Kowalski J",
        From: 17,
        To: 19,
        Type: "w",
    },
    {
        key: 7,
        Day: 2,
        Title: "Automatyzacja obliczeń inżynierskich",
        Place: "i24 E110",
        Lektor: "Kowalski J",
        From: 10,
        To: 12,
        Type: "l",
    },
    {
        key: 8,
        Day: 2,
        Title: "Komunikacja człowiek-komputer",
        Place: "i24 E110",
        Lektor: "Kowalski J",
        From: 12,
        To: 14,
        Type: "p",
    },
    {
        key: 9,
        Day: 3,
        Title: "Bazy Danych",
        Place: "i25 IBM",
        Lektor: "Kowalski J",
        From: 12,
        To: 14,
        Type: "l",
    },
    {
        key: 10,
        Day: 3,
        Title: "Programowanie obiektowe || (Java)",
        Place: "k22 B18 I.C",
        Lektor: "Kowalski J",
        From: 14,
        To: 16,
        Type: "l",
    },
    {
        key: 11,
        Day: 4,
        Title: "Systemy wbudowane",
        Place: "k22 B18 A2",
        Lektor: "Kowalski J",
        From: 8,
        To: 10,
        Type: "w",
    },
    {
        key: 12,
        Day: 4,
        Title: "Sieci komputerowe",
        Place: "E1",
        Lektor: "Kowalski J",
        From: 10,
        To: 12,
        Type: "w",
    },
    {
        key: 13,
        Day: 4,
        Title: "Automatyzacja obliczeń inżynierskich",
        Place: "E2",
        Lektor: "Kowalski J",
        From: 14,
        To: 16,
        Type: "w",
    },
    {
        key: 14,
        Day: 4,
        Title: "Sieci komputerowe",
        Place: "i24 311",
        Lektor: "Kowalski J",
        From: 16,
        To: 18,
        Type: "l",
    },
]

let isEditMode = false;
let ElementToDelete;

export default function Schedule(){

    let navigate = useNavigate();
    const handleBackToMenu = () => {
        navigate('/menu');
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (code) => {
        if(code === 1){
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="link" size="small" onClick={() => api.destroy()}>
                    Nie
                </Button>
                <Button type="primary" size="small" onClick={() => {api.destroy(); deleteElement()}}>
                    Tak
                </Button>
            </Space>
        );
        api.open({
            message: 'Czy napewno chesz usunąć wydarzenie?',
            btn,
            key,
            duration: 0,
        });
        }
        else if(code === 2) {
            api.success({
                message: 'Usunięcie przebiegła pomyślnie',
            })
        }
        else if(code === 3) {
            api.success({
                message: 'Edycja przebiegła pomyślnie',
            })
        }
        else if(code === 4) {
            api.success({
                message: 'Dodanie przebiegło pomyślnie',
            })
        }
    };

    let timeSlots = [
        "",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00"
    ];

    let Days = [
        "Pn",
        "Wt",
        "Śr",
        "Czw",
        "Pt"
    ]
    const Rows = new Array(5).fill(0);

    function Distance(Items, item){
        let i;
        for(i = 0; i<Items.length;i++){
            if(Items[i].key===item.key){
                if(i===0){
                    return (item.From-8)*(96/12);}
                else if(Items[i-1].Day===item.Day) {
                    return  (item.From-Items[i-1].To)*(96/12);}
                else{
                    return (item.From-8)*(96/12);}
            }
        }
    }
    useEffect(() => {
        const grid = document.createElement('div');
        grid.className = 'background-grid';
        document.body.appendChild(grid);

        for (let i = 0; i < 7; i++) {
            const row = document.createElement('div');
            if(i === 0) row.className = 'header-grid-row';
            else if(i === 6) row.className = 'last-grid-row';
            else row.className = 'grid-row';
            grid.appendChild(row);

            for (let j = 0; j < 13; j++) {
                const cell = document.createElement('div');
                if(j === 0) cell.className = 'day-grid-cell';
                else cell.className = 'grid-cell';
                row.appendChild(cell);
            }
        }

        return () => {
            document.body.removeChild(grid);
        };
    }, []);

    const error = (error_code) => {
        switch(error_code){
            case 1:
                message.error('Сzas musi być pomiędzy 08:00 a 20:00');
                break;
            case 2:
                message.error('Te godziny są już zajęte');
                break;
            case 3:
                message.error('Godziny nie mogą być jednakowymi');
                break;
            default:
                message.error('Nieznany błąd');
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (event) => {
        if (isEditMode === true) {
            form.setFieldsValue({
                Day: event.Day,
                Title: event.Title,
                Place: event.Place,
                Lektor: event.Lektor,
                Time: [dayjs(event.From.toString().padStart(2, '0'), 'HH'), dayjs(event.To.toString().padStart(2, '0'), 'HH')],
                Type: event.Type
            });
            let i;
            for(i=0; i<Events.length;i++){
                if(Events[i].key === event.key) {
                    break;
                }
            }
            ElementToDelete = i;
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };
    const handleOk = (event) => {
        let it;
        let err_code = 0;
        let From = event.Time[0].$H;
        let To = event.Time[1].$H;
        for(it = 0; it<Events.length;it++){
            if(From >= Events[it].From && From < Events[it].To && event.Day === Events[it].Day && it !== ElementToDelete) {
                err_code = 2;
                break;
            }
            if(To > Events[it].From && To <= Events[it].To && event.Day === Events[it].Day && it !== ElementToDelete){
                err_code = 2;
                break;
            }
        }
        if(From === To) err_code = 3;
        if (From < 8 || From > 20 || To < 8 || To > 20) err_code = 1;
        if(err_code!==0) error(err_code);
        else {
            if(isEditMode === true) {
                if(Events[ElementToDelete].key === event.key){
                    isEditMode = false;
                    setIsModalOpen(false);
                    return;
                }
                openNotification(3);
                Events.splice(ElementToDelete, 1);
            }
            else openNotification(4);
            Events.push({
                key: Events.length,
                Day: event.Day,
                Title: event.Title,
                Place: event.Place,
                Lektor: event.Lektor,
                From: From,
                To: To,
                Type: event.Type
            })
            isEditMode = false;
            setIsModalOpen(false);

        }
    };
    const handleCancel = () => {
        isEditMode = false;
        setIsModalOpen(false);
    };
    const deleteElement = () => {
        Events.splice(ElementToDelete,1);
        handleCancel();
        openNotification(2);
    };

    const { Option } = Select;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleOk(values);
    };

    const sortAndSetKeys = () => {
        let i;
        for(i = 0; i < Events.length; i++){
            Events[i].key = i;
        }
        Events.sort(function(a,b){
            if(a.Day < b.Day) return -1;
            if(a.Day > b.Day) return 1;
            if (a.From < b.From) return -1;
            if (a.From > b.From) return 1;
            return 0;})
    }

    return (
        <ConfigProvider>
            {contextHolder}
            <style>{`
            *{
            margin: 0;
            padding: 0;
            }
            
        .schedule-header {
            position: relative;
            height: 130px;
            background-color: #882220;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            font-size: 35px;
            color: #FFFFFF;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
            font-family: 'Readex Pro', sans-serif;
            margin-bottom: 1vh;
        }
        
        .back-button {
            position: absolute;
            top: 20px;
            left: 30px;
            cursor: pointer;
            font-size: 24px;
            color: #FFFFFF;
        }
        
        .time {
             width:100%;
             white-space: pre-wrap;
        }
        
        .cols {
        text-align:right;
        }
        
        .schedule-body {
            position:relative;
            display:flex;
            flex-direction: column;
        }
        
        .schedule-body .cell {
            height: 100px;
            margin: 0 1% 5px 1%;
            border-radius: 5px;
            background-color: white;
        }
        
        .schedule-body .void_cell {
            height: 100px;
            margin: 0 1% 5ox 1%;
        }
        
        .cell_title{
            width:100%;
            background-color: #dedede;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        
        .weekday {
            width: 100%;
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        
        td{
            align: center;
            background-color: blue;
        }
        .background-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: -1;
            display: flex;
            flex-direction: column;
        }
        .grid-row {
            display: flex;
            height: 109px;
            border-top: 1px solid #ccc;
        }
        .grid-cell {
            flex: ${(96/12)}%;
            border-left: 1px solid #ccc;
        }
                
        .header-grid-row {
            height: 133px;
            border-top: 1px solid #ccc;
        }
        
        .last-grid-row {
            border-top: 1px solid #ccc;
        }
                
        .day-grid-cell {
            flex: ${(100/25)}%;
            border-left: 1px solid #ccc;
        }
        
        .add_button {
            position: fixed;
            height: 50px;
            width: 50px;
            bottom: 20px;
            right: 20px;
            background-color: #f5dd02;
            z-index: 100;
            color: white;
            text-align: center;
            border-radius: 5px;
            font-size: 30px;
            font-height: 30px;
            font-weight: bold;
            transition: 0.5s;
        }
     
        .add_button:hover{
            cursor: pointer;
            transform: scale(1.1);
        }
        
        .edit_button:hover{
            cursor: pointer;    
        }
        
      `}</style>
            {sortAndSetKeys()}
            <div class="add_button" style={!isAdmin ? {display: `none`} : {}} onClick={showModal}>+</div>
            <div className="schedule-header">
                <div className="back-button" onClick={handleBackToMenu}>
                    <BiArrowBack/>
                </div>
                <div class="title">
                    Plan zajęć
                </div>
                <div class="time">
                    <Row>
                        {timeSlots.map((slot, index) => (
                            <Col flex={index === 0 ? `${(100/25)}%` : `${(96/12)}%`}>
                                <div className="cols">
                                    <p>{slot}
                                        {index < timeSlots.length-1 && index!==0 && <span>|</span>}
                                        {index === timeSlots.length-1 && <span>  </span>}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div class="schedule-body">
                {Rows.map((_, RowIndex) => (
                    <Row>
                        <Col flex={`${(100/25)}%`}><div class="weekday"><span>{Days[RowIndex]}</span></div></Col>
                        {Events.filter(event => event.Day === RowIndex).map((event) => (
                            <Col flex={`${(96 / 12) * (event.To - event.From)}%`} style={{marginLeft: `${Distance(Events, event)}%`}}>
                                <div className="cell" style={{
                                    border: `3px solid ${event.Type === "w" ? "#dbb404" : event.Type === "l" ? "#04b530" : event.Type === "lekt" ? "#04dbb7" : event.Type === "p" ? "#b504a0" : "gray"}`
                                }}>
                                    <div className="cell_title">{event.Type},
                                        <div className="edit_button" style={!isAdmin ? {display: `none`} : {}} onClick={() => {isEditMode=true; showModal(event)}}><BiEditAlt/>
                                        </div>
                                    </div>
                                    <p>{event.Title}</p>
                                    <p><b>{event.Place}</b></p>
                                    <p><i>{event.Lektor}</i></p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ))}
            </div>
            <Modal
                title={isEditMode === true ? "Edytuj" : "Dodaj"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    isEditMode && (
                        <Button danger key="Delete" onClick={() => openNotification(1)}>
                            Usuń
                        </Button>
                    ),
                    <Button key="Close" onClick={handleCancel}>
                        Zamknij
                    </Button>,
                    <Button key="Add" type="primary" onClick={() => form.submit()}>
                        {isEditMode===true ? 'Zapisz' : 'Dodaj'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="Day"
                        label="Dzień"
                        rules={[{ required: true, message: 'Proszę wybrać dzień!' }]}
                    >
                        <Select placeholder="Wybierz dzień">
                            <Option value={0}>Poniedziałek</Option>
                            <Option value={1}>Wtorek</Option>
                            <Option value={2}>Środa</Option>
                            <Option value={3}>Czwartek</Option>
                            <Option value={4}>Piątek</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Title"
                        label="Nazwa przedmiotu"
                        rules={[{ required: true, message: 'Proszę wpisać nazwę przedmiotu!' }]}
                    >
                        <Input placeholder="Nazwa przedmiotu" />
                    </Form.Item>
                    <Form.Item
                        name="Place"
                        label="Sala"
                        rules={[{ required: true, message: 'Proszę wpisać miejsce!' }]}
                    >
                        <Input placeholder="Miejsce" />
                    </Form.Item>
                    <Form.Item
                        name="Lektor"
                        label="Lektor"
                        rules={[{ required: true, message: 'Proszę wpisać imię i nazwisko lektora!' }]}
                    >
                        <Input placeholder="Lektor" />
                    </Form.Item>
                    <Form.Item
                        name="Time"
                        label="Godziny"
                        rules={[{ required: true, message: 'Proszę wybrać godziny zajęć!' }]}
                    >
                        <TimePicker.RangePicker format="HH" />
                    </Form.Item>
                    <Form.Item
                        name="Type"
                        label="Typ zajęć"
                        rules={[{ required: true, message: 'Proszę wybrać typ zajęć!' }]}
                    >
                        <Select placeholder="Wybierz typ zajęć">
                            <Option value="w">Wykład</Option>
                            <Option value="l">Laboratorium</Option>
                            <Option value="lekt">Lektorat</Option>
                            <Option value="p">Projekt</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};