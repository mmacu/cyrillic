import cyrillic from './cyrillic.json'
import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Button, Grid, Paper, Box, Typography, LinearProgress } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

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
    while (currentIndex != 0) {
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
      cyrillic.filter((element) => element !== correct),
      ANSWER_COUNT
    )
    const randomIdx = getRandomInt(answers.length - 1)
    answers[randomIdx] = lettersLeft[0]
    return answers
  }

  const [lettersLeft, setLettersLeft] = useState(shuffleArray([...cyrillic]))
  const [currentAnswers, setCurrentAnswers] = useState([])
  const [currentLetterAnswered, setCurrentLetterAnswered] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setCurrentAnswers(getAnswers(lettersLeft[0]))
  }, [])

  const playAudio = () => {
    const audioPath = process.env.PUBLIC_URL + `/sounds/${lettersLeft[0].uppercase}.mp3`
    let audio = new Audio(audioPath)
    audio.play()
  }

  const submitAnswer = (answer) => {
    playAudio()
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

  const goNext = () => {
    if (lettersLeft.length > 0) {
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

  const isFinished = () => {
    return lettersLeft.length === 0 && currentLetterAnswered
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper
          elevation={2}
          sx={{
            marginTop: 6,
            maxWidth: 440,
            marginLeft: 'auto',
            marginRight: 'auto',
            minHeight: '40vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            borderRadius: 4,
            padding: 4,
          }}
        >
          <Box sx={{ minHeight: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3">
              {lettersLeft[0].uppercase} {lettersLeft[0].lowercase}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {currentAnswers.map((answer, idx) => (
              <Grid item key={answer.uppercase} xs={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ textTransform: 'none', fontSize: 16 }}
                  color={getButtonColor(answer)}
                  onClick={() => submitAnswer(answer, idx)}
                >
                  {t(answer.uppercase)}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={(progress * 100) / cyrillic.length} />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!currentLetterAnswered}
                size="large"
                fullWidth
                variant="contained"
                onClick={() => goNext()}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App
