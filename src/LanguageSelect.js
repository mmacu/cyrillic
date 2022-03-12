import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next'

function LanguageSelect(props) {
  const [t, i18n] = useTranslation()

  const codeToLanguageString = {
    en: '🇬🇧 English',
    pl: '🇵🇱 Polish',
  }

  return (
      <FormControl fullWidth>
        <InputLabel>{t('my-language')}</InputLabel>
        <Select
          value={i18n.language}
          label={t('my-language')}
          onChange={(event) => {
            i18n.changeLanguage(event.target.value)
          }}
        >
          {Object.entries(codeToLanguageString).map(([key, value]) => (
            <MenuItem key={key} value={key}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}
export default LanguageSelect