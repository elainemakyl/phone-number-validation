import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

import { ReactComponent as ArrowUp } from '../../../assets/icons/up-arrow.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/down-arrow.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
  width: 100%;
`;

const Dropdown = styled.div`
  position: relative;
  min-width: 300px;
`

const DropdownSelect = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  align-items: center;
  padding: 0 4px;
  
  & input {
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

const OptionContainer = styled.div`
  background-color: #fff;
  display: ${({ open }) => open ? 'block' : 'none'};
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  position: absolute;
  z-index: 99;
  border: 1px solid #000;
  box-sizing: border-box;

`;

const OptionList = styled.div`

`;

const OptionFilterInput = styled.input`
  position: sticky;
  box-sizing: border-box;
  width: 100%;
  top: 0px;
`

const Option = styled.div`
  &:hover {
    background-color: #ccc;
  }

  font-style: ${({ styled }) => styled ? 'bold' : 'normal'};
`


const AreaCodeDropdown = (props) => {
  const { label, options = [], defaultSelectedValue, onSelectChange, selected } = props;

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(defaultSelectedValue || '');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef?.current?.contains(e?.target)) setOpen(false);
    };
    document.addEventListener("click", closeDropdown)
    return () => document.removeEventListener("click", closeDropdown)
  }, []);

  const toggleDropdown = () => {
    setOpen(true);
  }

  const onSelect = (option) => {
    setKeyword('');
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
    <Container ref={dropdownRef}>
      <Dropdown>
        <DropdownSelect onClick={toggleDropdown}>
          <p>{`${selected?.dial_code} ${selected?.flag} ${selected?.name}`}</p>
          {open ? <ArrowUp /> : <ArrowDown />}
        </DropdownSelect>
        
        <OptionContainer open={open}>
          <OptionFilterInput
            type='text'
            onChange={onKeywordChange}
            name={`${label}Dropdown`}
            value={keyword}  
          ></OptionFilterInput>
          <OptionList>
            {filteredOptions.map(option => (
              <Option
                key={option.code}
                onClick={() => onSelect(option)}
                selected={keyword === option.name}>
                {`${option.dial_code} ${option.flag} ${option.name}`}
              </Option>
            ))}
          </OptionList>
         
        </OptionContainer>
      </Dropdown>
    </Container>
  )
}

export default AreaCodeDropdown;