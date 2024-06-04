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
        content: "Dzień otwarty z firmą KILARGO",
        details: "Dlaczego warto wziąć udział?\n" +
            "\n" +
            "Poznaj świat lodów Kilargo - Dowiedz się, jak powstają naszej wyjątkowe produkty i jakie technologie wykorzystujemy do produkcji.\n" +
            "Ścieżki kariery - Zdobądź informacje o możliwościach rozwoju zawodowego w naszej firmie. Poznaj aktualne oferty pracy.\n" +
            "Networking - Spotkaj się z przedstawicielem firmy Kilargo, zadaj pytania i zostaw swoje CV.\n" +
            "Degustacja lodów - Skosztuj naszych pysznych lodów i przekonaj się, że nikt nie robi lepszych!\n" +
            "Zapraszamy!\n" +
            "Miejsce wydarzenia: wejście do budynku A2 Wydziału Biotechnologii i Nauk o Żywności, od strony ul. Stefanowskiego - w przypadku niepogody szukaj nas w środku!\n" +
            "\nGodzina: 10:00 - 15:00\n" +
            "Organizator: Kilargo\n"
    },
    {
        year: 2024,
        month: 5,
        day: 21,
        type: "success",
        content: "Szkolenie \"Zarządzanie finansami w biznesie\"",
        details: "Szkolenie  zostało tak zaprojektowane, aby dostarczyć uczestnikom wiedzy i umiejętności niezbędnych do efektywnego zarządzania finansami w sektorze biznesowym. Program skierowany jest do studentów, którzy chcą mądrze zarządzać finansami w swojej firmie.\n" +
            "Celem szkolenia jest zapewnienie uczestnikom gruntownego zrozumienia kluczowych aspektów finansowych, niezbędnych do prowadzenia i rozwijania działalności gospodarczej. Uczestnicy nauczą się interpretować dane finansowe, przeprowadzać analizy finansowe, tworzyć skuteczne strategie budżetowania oraz planowania finansowego. Szkolenie obejmie również zagadnienia związane z zarządzaniem przepływami pieniężnymi i oceną ryzyka finansowego. Jego przedmiotem są także metody wyceny i zarządzania inwestycjami.\n" +
            "Miejsce wydarzenia: Centrum Technologii Informatycznych, bud. B-19, Wólczańska 217/223\n" +
            "Godzina: 14:00 - 16:00\n" +
            "Organizator: Biuro Karier\n" +
            "Cena wejścia: bezpłatne"
    },
    {
        year: 2024,
        month: 9,
        day: 24,
        type: "success",
        content: "Szkolenie \"Zarządzanie finansami w biznesie\"",
        details: "Szkolenie  zostało tak zaprojektowane, aby dostarczyć uczestnikom wiedzy i umiejętności niezbędnych do efektywnego zarządzania finansami w sektorze biznesowym. Program skierowany jest do studentów, którzy chcą mądrze zarządzać finansami w swojej firmie.\n" +
            "Celem szkolenia jest zapewnienie uczestnikom gruntownego zrozumienia kluczowych aspektów finansowych, niezbędnych do prowadzenia i rozwijania działalności gospodarczej. Uczestnicy nauczą się interpretować dane finansowe, przeprowadzać analizy finansowe, tworzyć skuteczne strategie budżetowania oraz planowania finansowego. Szkolenie obejmie również zagadnienia związane z zarządzaniem przepływami pieniężnymi i oceną ryzyka finansowego. Jego przedmiotem są także metody wyceny i zarządzania inwestycjami.\n" +
            "Miejsce wydarzenia: Centrum Technologii Informatycznych, bud. B-19, Wólczańska 217/223\n" +
            "Godzina: 14:00 - 16:00\n" +
            "Organizator: Biuro Karier\n" +
            "Cena wejścia: bezpłatne"
    },
    {
        year: 2024,
        month: 9,
        day: 25,
        type: "success",
        content: "Dzień otwarty z firmą KILARGO",
        details: "Dlaczego warto wziąć udział?\n" +
            "\n" +
            "Poznaj świat lodów Kilargo - Dowiedz się, jak powstają naszej wyjątkowe produkty i jakie technologie wykorzystujemy do produkcji.\n" +
            "Ścieżki kariery - Zdobądź informacje o możliwościach rozwoju zawodowego w naszej firmie. Poznaj aktualne oferty pracy.\n" +
            "Networking - Spotkaj się z przedstawicielem firmy Kilargo, zadaj pytania i zostaw swoje CV.\n" +
            "Degustacja lodów - Skosztuj naszych pysznych lodów i przekonaj się, że nikt nie robi lepszych!\n" +
            "Zapraszamy!\n" +
            "Miejsce wydarzenia: wejście do budynku A2 Wydziału Biotechnologii i Nauk o Żywności, od strony ul. Stefanowskiego - w przypadku niepogody szukaj nas w środku!\n" +
            "\nGodzina: 10:00 - 15:00\n" +
            "Organizator: Kilargo\n"
    },
    {
        year: 2024,
        month: 10,
        day: 15,
        type: "success",
        content: "Dzień otwarty z firmą KILARGO",
        details: "Dlaczego warto wziąć udział?\n" +
            "\n" +
            "Poznaj świat lodów Kilargo - Dowiedz się, jak powstają naszej wyjątkowe produkty i jakie technologie wykorzystujemy do produkcji.\n" +
            "Ścieżki kariery - Zdobądź informacje o możliwościach rozwoju zawodowego w naszej firmie. Poznaj aktualne oferty pracy.\n" +
            "Networking - Spotkaj się z przedstawicielem firmy Kilargo, zadaj pytania i zostaw swoje CV.\n" +
            "Degustacja lodów - Skosztuj naszych pysznych lodów i przekonaj się, że nikt nie robi lepszych!\n" +
            "Zapraszamy!\n" +
            "Miejsce wydarzenia: wejście do budynku A2 Wydziału Biotechnologii i Nauk o Żywności, od strony ul. Stefanowskiego - w przypadku niepogody szukaj nas w środku!\n" +
            "\nGodzina: 10:00 - 15:00\n" +
            "Organizator: Kilargo\n"
    },
    {
        year: 2023,
        month: 9,
        day: 15,
        type: "success",
        content: "Dzień otwarty z firmą KILARGO",
        details: "Dlaczego warto wziąć udział?\n" +
            "\n" +
            "Poznaj świat lodów Kilargo - Dowiedz się, jak powstają naszej wyjątkowe produkty i jakie technologie wykorzystujemy do produkcji.\n" +
            "Ścieżki kariery - Zdobądź informacje o możliwościach rozwoju zawodowego w naszej firmie. Poznaj aktualne oferty pracy.\n" +
            "Networking - Spotkaj się z przedstawicielem firmy Kilargo, zadaj pytania i zostaw swoje CV.\n" +
            "Degustacja lodów - Skosztuj naszych pysznych lodów i przekonaj się, że nikt nie robi lepszych!\n" +
            "Zapraszamy!\n" +
            "Miejsce wydarzenia: wejście do budynku A2 Wydziału Biotechnologii i Nauk o Żywności, od strony ul. Stefanowskiego - w przypadku niepogody szukaj nas w środku!\n" +
            "\nGodzina: 10:00 - 15:00\n" +
            "Organizator: Kilargo\n"
    }
]

function EventDetails({ details }) {
    const formattedDetails = details.split('\n').map((line, index) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const label = line.substring(0, colonIndex + 1);
            const rest = line.substring(colonIndex + 1);
            return <p key={index}><strong>{label}</strong>{rest}</p>;
        }
        return <p key={index}>{line}</p>;
    });

    return (
        <div style={{ whiteSpace: 'pre-line' }}>
            {formattedDetails}
        </div>
    );
}
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
            top: 50px;
            left: 30px;
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
                        <h2>{event.content}</h2>
                        <EventDetails details={event.details}/>
                    </div>
                ))}
            </Modal>
        </ConfigProvider>
    );
};