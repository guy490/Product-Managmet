/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { createFolder, createFolderList, createMonthsList } from '../utilities';
import { DirectoryContext, MonthListContext } from '../Context';

import {
  Months,
  LAST_MONTH,
  FIRST_MONTH,
  MONTH_STATUS,
  ICONS,
} from '../constants';

const DateDetails = () => {
  const { path } = useContext(DirectoryContext);
  const { selectedYear, setSelectedYear } = useContext(DirectoryContext);
  const { selectedMonth, setSelectedMonth } = useContext(DirectoryContext);
  const { months, setMonths } = useContext(MonthListContext);
  const [years, setYears] = useState<string[]>([]);
  const monthUlRef = useRef<HTMLUListElement>(null);
  const yearUlRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedYear) {
      const monthList = createMonthsList(`${path}\\${selectedYear}`);
      setMonths(monthList);
    }
  }, [selectedYear, path, setMonths]);

  useEffect(() => {
    if (path) {
      const res = createFolderList(path);
      setYears(res);
    }
  }, [path]);

  const markSelected = (
    ulRef: React.RefObject<HTMLUListElement>,
    selectedElement: string
  ) => {
    if (ulRef.current !== null && ulRef.current.childNodes.length > 1) {
      ulRef.current?.childNodes.forEach((child) => {
        if (child.textContent === selectedElement) {
          child.style.border = '1px solid black';
        } else {
          child.style.border = '';
        }
      });
    }
  };

  useEffect(() => {
    markSelected(yearUlRef, selectedYear);
  }, [selectedYear, setSelectedMonth]);

  useEffect(() => {
    if (selectedMonth) {
      markSelected(monthUlRef, selectedMonth.month);
    }
  }, [selectedMonth]);
  const addNewYear = () => {
    const newYear: string = (
      parseInt(years[years.length - 1], 10) + 1
    ).toString();
    setYears([...years, newYear]);
    createFolder(`${path}\\${newYear}`);
    return newYear;
  };
  const selectYear = (newYear: string) => {
    setMonths([]);
    setSelectedMonth({ month: '', status: '' });
    setSelectedYear(newYear);
  };
  const createYearElement = (content: string, key?: string) => {
    const listKey = key === undefined ? content : key;
    return (
      <li
        key={listKey}
        className="list-element"
        onClick={() => {
          if (listKey === 'last') {
            addNewYear();
          } else {
            selectYear(content);
          }
        }}
      >
        {content}
      </li>
    );
  };

  const createYearsList = () => {
    return years.map((el) => createYearElement(el));
  };

  const addNewMonth = () => {
    const lastListedMonth = Months.indexOf(months[months.length - 1].month);
    if (lastListedMonth === LAST_MONTH) {
      const newYear = addNewYear();
      setSelectedMonth({ month: '', status: '' });
      selectYear(newYear);
      setMonths([{ month: Months[FIRST_MONTH], status: MONTH_STATUS.NEW }]);
      createFolder(
        `${path}\\${newYear}\\${Months[FIRST_MONTH]} - ${MONTH_STATUS.NEW}`
      );
    } else {
      const newMonth: { month: string; status: string } = {
        month: Months[lastListedMonth + 1],
        status: MONTH_STATUS.NEW,
      };
      setMonths([...months, newMonth]);
      const yearPath = `${path}\\${selectedYear}`;
      createFolder(`${yearPath}\\${newMonth.month} - ${MONTH_STATUS.NEW}`);
    }
  };
  const createMonthElement = (content: { month: string; status: string }) => {
    return (
      <li
        key={content.month}
        className="list-element"
        onClick={() => {
          if (content.status === MONTH_STATUS.NEW_BUTTON) {
            addNewMonth();
          } else {
            setSelectedMonth(content);
          }
        }}
      >
        <div
          className="container"
          title={`${content.month} -  ${content.status}`}
        >
          <span className="month-text">{content.month}</span>
          <span className="month-status">
            <i className={`fas ${ICONS[content.status?.replace(' ', '')]}`} />
          </span>
        </div>
      </li>
    );
  };
  const createMonthsElementList = () => {
    months.sort((a, b) => {
      return Months.indexOf(a.month) - Months.indexOf(b.month);
    });
    return months.map((el) => createMonthElement(el));
  };
  return (
    <div className="lists-view">
      <ul className="year-list" ref={yearUlRef}>
        {createYearsList()}
        {path ? createYearElement('New Year', 'last') : ''}
      </ul>
      <ul className="months-list" ref={monthUlRef}>
        {createMonthsElementList()}
        {selectedYear
          ? createMonthElement({
              month: 'New Month',
              status: MONTH_STATUS.NEW_BUTTON,
            })
          : ''}
      </ul>
    </div>
  );
};

export default DateDetails;
