/* eslint-disable react/react-in-jsx-scope */
import { render, act } from '@testing-library/react'
import AreaCodeDropdown from '.'
import data from '../data/country-code.json'

const DEFAULT_AREA_CODE = {
  name: 'Hong Kong',
  flag: '🇭🇰',
  code: 'HK',
  dial_code: '+852'
}

describe('SearchableDropdown', () => {
  test('should render', () => {
    const { getByText } = render(
      <AreaCodeDropdown options={data} selected={DEFAULT_AREA_CODE} />
    )
    expect(getByText(`${DEFAULT_AREA_CODE.flag} ${DEFAULT_AREA_CODE.name} (${DEFAULT_AREA_CODE.dial_code})`)).toBeInTheDocument()
  })

  test('should able to see the dropdown options when click', () => {
    const { container, getAllByText } = render(
      <AreaCodeDropdown options={data} selected={DEFAULT_AREA_CODE} />
    )
    const dropdown = container.querySelector('p')
    act(() => { dropdown.click() })
    data.forEach((country) => {
      expect(getAllByText(`${DEFAULT_AREA_CODE.flag} ${DEFAULT_AREA_CODE.name} (${DEFAULT_AREA_CODE.dial_code})`)[0]).toBeInTheDocument()
    })
  })
})
