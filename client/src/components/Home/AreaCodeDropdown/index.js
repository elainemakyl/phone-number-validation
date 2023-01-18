/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowUp } from '../../../assets/icons/up-arrow.svg'
import { ReactComponent as ArrowDown } from '../../../assets/icons/down-arrow.svg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
  min-height: 40px;
  width: 100%;
`

const Dropdown = styled.div`
  position: relative;
  min-width: 300px;
`

const DropdownSelect = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 5px;
  min-height: 40px;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;

  ${({ isOpen }) => isOpen && `
    outline: #76FBD6 solid 1px;
    border: 1px solid #76FBD6;
    box-shadow: 0 0 5px #719ECE;
  `}

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
`

const OptionContainer = styled.div`
  background-color: #fff;
  display: block;
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  position: absolute;
  z-index: 99;
  border: 1px solid #000;
  box-sizing: border-box;

`

const OptionFilterInput = styled.input`
  position: sticky;
  box-sizing: border-box;
  width: 100%;
  top: 0px;
  height: 30px;
  font-size: 16px;
`

const Option = styled.span`
  &:hover {
    background-color: #ccc;
  }
  display: block;
  padding: 5px;
  font-size: 16px;
  font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
  background-color: ${({ selected }) => selected ? '#2F3C5B50' : '#fff'};
  
`

const AreaCodeDropdown = (props) => {
  const { options = [], onSelectChange, selected } = props

  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef?.current?.contains(e?.target)) setOpen(false)
    }
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [])

  const toggleDropdown = () => {
    setOpen(true)
  }

  const onSelect = (option) => {
    setKeyword('')
    onSelectChange(option)
    setOpen(!open)
  }

  const onKeywordChange = (e) => {
    const input = e.target.value || ''
    setKeyword(input)
  }

  const filteredOptions = options.filter(option => {
    const isNameMatch = option?.name?.toLowerCase().indexOf(keyword?.toLowerCase()) > -1
    const isDialCodeMatch = option?.dial_code.indexOf(keyword?.toLowerCase()) > -1
    return !keyword || isNameMatch || isDialCodeMatch
  })

  return (
    <Container ref={dropdownRef}>
      <Dropdown>
        <DropdownSelect onClick={toggleDropdown} isOpen={open}>
          <p>{`${selected?.flag} ${selected?.name} (${selected?.dial_code})`}</p>
          {open ? <ArrowUp /> : <ArrowDown />}
        </DropdownSelect>

        {open && (
          <OptionContainer open={open}>
            <OptionFilterInput
              type='text'
              onChange={onKeywordChange}
              name={Dropdown}
              value={keyword}
              placeholder={'Search country or area code'}
            ></OptionFilterInput>
            <div>
              {filteredOptions.map(option => {
                return (
                  <Option
                    key={option.code}
                    onClick={() => onSelect(option)}
                    selected={selected?.name === option.name}>
                    {`${option.flag} ${option.name} (${option.dial_code})`}
                  </Option>
                )
              })}
            </div>
          </OptionContainer>
        )}

      </Dropdown>
    </Container>
  )
}

export default AreaCodeDropdown
