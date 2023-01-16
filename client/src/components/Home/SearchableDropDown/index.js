import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

import { ReactComponent as ArrowUp } from '../../../assets/icons/up-arrow.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/down-arrow.svg';

const DropdownContainer = styled.div`
  position: relative;
`

const Dropdown = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #000;

  & > input {
    border: none;
    width: 100%;
  }

  & > p {
    margin: 0;
    padding: 0;
  }

  & > svg {
    width: 22px;
    height: 22px;
  }
`;

const OptionList = styled.div`
  background-color: #ffeeee;
  display: ${({ open }) => open ? 'block' : 'none'};
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  position: absolute;
  z-index: 99;

`;

const Option = styled.div`
  &:hover {
    background-color: #ccc;
  }

  font-style: ${({ styled }) => styled ? 'bold' : 'normal'};
`


const AreaCodeDropdown = (props) => {
  const { label, options = [], defaultSelectedValue, onSelectChange, selected} = props;

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(defaultSelectedValue || '');
  const inputRef = useRef(null);

  // useEffect(() => {
  //   const closeDropdown = (e) => {
  //     if (e?.target !== inputRef?.current) setOpen(false);
  //   };
  //   document.addEventListener("click", closeDropdown)
  //   return () => document.removeEventListener("click", closeDropdown)
  // }, []);

  const toggleDropdown = () => {
    console.log('dropdown clicked')
    setOpen(true);
  }

  const onSelect = (option) => {
    setKeyword(option.name);
    onSelectChange(option);
    setOpen(!open);
  }

  const onKeywordChange = (e) => {
    const input = e.target.value || '';
    setKeyword(input);
  }

  const filteredOptions = options.filter(option => {
    const isNameMatch = option?.name?.toLowerCase().indexOf(keyword?.toLowerCase()) > -1;
    const isDialCodeMatch = option?.dial_code.indexOf(keyword?.toLowerCase()) > -1;
    return !keyword || isNameMatch || isDialCodeMatch;
  });

  return (
    <>
      <label>{label}</label>
      <DropdownContainer>
        <Dropdown onClick={toggleDropdown}>
          {open ?
            <input
              type='text'
              onChange={onKeywordChange}
              name={`${label}Dropdown`}
              value={keyword}
              ref={inputRef}
            ></input> :
            <p>{`${selected?.dial_code} ${selected?.flag} ${selected?.name}`}</p>
          }

          {open ? <ArrowUp /> : <ArrowDown />}
        </Dropdown>
        <OptionList open={open}>
          {filteredOptions.map(option => (
            <Option
              key={option.code}
              onClick={() => onSelect(option)}
              selected={keyword === option.name}>
              {`${option.dial_code} ${option.flag} ${option.name}`}
            </Option>
          ))}
        </OptionList>
      </DropdownContainer>
    </>
  )
}

export default AreaCodeDropdown;