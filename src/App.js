import russian from './data/russian.json'
import ukrainian from './data/ukrainian.json'
import React, { useState, useEffect } from 'react'
import {
  Container,
  CssBaseline,
  Button,
  Grid,
  Paper,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import LanguageSelect from './LanguageSelect.js'
import AlphabetSelect from './AlphabetSelect.js'

const ANSWER_COUNT = 6

function App() {
  const [t, i18n] = useTranslation()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    })
  )

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  const getRandomSubarray = (arr, size) => {
    var shuffled = arr.slice(0),
      i = arr.length,
      temp,
      index
    while (i--) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(0, size)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const getAnswers = (correct) => {
    const answers = getRandomSubarray(
      alphabet.filter((element) => element !== correct),
      ANSWER_COUNT
    )
    const randomIdx = getRandomInt(answers.length - 1)
    answers[randomIdx] = lettersLeft[0]
    return answers
  }

  const handleSettingsClose = () => {
    setSettingsMenuAnchor(null)
  }

  const [lettersLeft, setLettersLeft] = useState(shuffleArray([...ukrainian]))
  const [currentAnswers, setCurrentAnswers] = useState([])
  const [currentLetterAnswered, setCurrentLetterAnswered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [alphabetLang, setAlphabetLang] = useState('ukrainian')
  const [alphabet, setAlphabet] = useState(ukrainian)
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState(null)
  const [useSound, setUseSound] = useState(true)
  const [swap, setSwap] = useState(false)
  const settingsOpen = Boolean(settingsMenuAnchor)

  useEffect(() => {
    axios.get(process.env.REACT_APP_COUNTER_URL)
  }, [])

  useEffect(() => {
    setCurrentAnswers(getAnswers(lettersLeft[0]))
  }, [lettersLeft])

  useEffect(() => {
    const alphabet = alphabetLang === 'russian' ? russian : ukrainian;
    setAlphabet(alphabet)
  }, [alphabetLang])
  
  useEffect(() => {
    const shuffledCyrillic = shuffleArray([...alphabet])
    setLettersLeft(shuffledCyrillic)
    setProgress(0)
  }, [alphabet])

  const playLetterAudio = () => {
    const audioPath = process.env.PUBLIC_URL + `/sounds/${alphabetLang}/letters/${lettersLeft[0].uppercase}.mp3`
    let audio = new Audio(audioPath)
    audio.play()
  }

  const submitAnswer = (answer) => {
    if (useSound) {
      playLetterAudio()
    }
    if (currentLetterAnswered) {
      return
    }
    setCurrentLetterAnswered(true)
    if (answer !== lettersLeft[0]) {
      lettersLeft.push(lettersLeft[0])
    } else {
      setProgress((oldValue) => oldValue + 1)
    }
  }

  const isFinished = () => {
    return progress === alphabet.length
  }

  const goNext = () => {
    if (isFinished()) {
      const shuffledCyrillic = shuffleArray([...alphabet])
      setLettersLeft(shuffledCyrillic)
      setProgress(0)
    } else if (lettersLeft.length > 0) {
      lettersLeft.shift()
      setCurrentAnswers(getAnswers(lettersLeft[0]))
    }
    setCurrentLetterAnswered(false)
  }

  const getButtonColor = (answer) => {
    if (!currentLetterAnswered) {
      return 'primary'
    } else if (lettersLeft[0] === answer) {
      return 'success'
    } else {
      return 'error'
    }
  }

  const getButtonVariant = (answer) => {
    if (currentLetterAnswered && lettersLeft[0] === answer) {
      return 'contained'
    } else {
      return 'outlined'
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper
          elevation={2}
          sx={{
            marginTop: 6,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
            minHeight: '40vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            borderRadius: 4,
            padding: 4,
            position: 'relative',
          }}
        >
          <IconButton sx={{ position: 'absolute', top: 4, left: 4 }}>
            <SettingsIcon onClick={(event) => setSettingsMenuAnchor(event.currentTarget)} />
          </IconButton>
          <Menu sx={{ maxWidth: 250 }} anchorEl={settingsMenuAnchor} open={settingsOpen} onClose={handleSettingsClose}>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={useSound}
                    onChange={(event) => {
                      setUseSound(event.target.checked)
                    }}
                  />
                }
                label={t('sound')}
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={swap}
                    onChange={(event) => {
                      setSwap(event.target.checked)
                    }}
                  />
                }
                label={t('swap')}
              />
            </MenuItem>
            <MenuItem>
              <LanguageSelect />
            </MenuItem>
            <MenuItem>
              <AlphabetSelect alphabetLang={alphabetLang} setAlphabetLang={setAlphabetLang} />
            </MenuItem>
          </Menu>
          <Box sx={{ minHeight: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {swap &&
              <Typography variant="h3">
                {t(alphabetLang + '.' + lettersLeft[0].uppercase)}
              </Typography>
            }
            {!swap && (
              <Typography variant="h3">
                {lettersLeft[0].uppercase} {lettersLeft[0].lowercase}
              </Typography>
            )}
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {currentAnswers.map((answer, idx) => (
              <Grid item key={answer.uppercase} xs={4}>
                <Button
                  variant={getButtonVariant(answer)}
                  fullWidth
                  style={{ textTransform: 'none', fontSize: 16 }}
                  color={getButtonColor(answer)}
                  onClick={() => submitAnswer(answer, idx)}
                >
                  {swap ? answer.uppercase + ' ' + answer.lowercase : t(alphabetLang + '.' + answer.uppercase)}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={(progress / alphabet.length) * 100} />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!currentLetterAnswered}
                size="large"
                fullWidth
                variant="contained"
                onClick={() => goNext()}
                startIcon={isFinished() ? <RestartAltIcon /> : null}
              >
                {isFinished() ? t('reset') : t('next')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App
