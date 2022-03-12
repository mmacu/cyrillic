import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'


function LanguageSelect(props) {
  const [t, i18n] = useTranslation()

  const alphabets = {ukrainian: "🇺🇦 Ukrainian ", russian: "🇷🇺 Russian"}

  return (
      <FormControl fullWidth>
        <InputLabel>{t('alphabet')}</InputLabel>
        <Select
          value={props.alphabetLang}
          label={t('alphabet')}
          onChange={(event) => {
            props.setAlphabetLang(event.target.value)
          }}
        >
          {Object.entries(alphabets).map(([key, value]) => (
            <MenuItem key={key} value={key}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}
export default LanguageSelect