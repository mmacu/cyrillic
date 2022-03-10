import cyrillic from './cyrillic.json'
import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Button, Grid, Paper, Stack, Box, Typography, LinearProgress } from '@mui/material'

const ANSWER_COUNT = 6

function App() {
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
    answers[randomIdx] = currentLetter
    return answers
  }

  const [lettersLeft, setLettersLeft] = useState([...cyrillic])
  const [currentLetter, setCurrentLetter] = useState(cyrillic[0])
  const [currentAnswers, setCurrentAnswers] = useState(getAnswers(cyrillic[0]))
  const [currentLetterAnswered, setCurrentLetterAnswered] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    lettersLeft.shift()
  }, [])

  useEffect(() => {
    setCurrentAnswers(getAnswers(currentLetter))
  }, [currentLetter])

  const playAudio = () => {
    const audioPath = process.env.PUBLIC_URL + `/sounds/${currentLetter.uppercase}.mp3`
    let audio = new Audio(audioPath)
    audio.play()
  }

  const submitAnswer = (answer) => {
    playAudio()
    if (currentLetterAnswered) {
      return
    }
    setCurrentLetterAnswered(true)
    if (answer !== currentLetter) {
      lettersLeft.push(currentLetter)
    } else {
      setProgress((oldValue) => oldValue + 1)
    }
  }

  const goNext = () => {
    if (lettersLeft.length > 0) {
      setCurrentLetter(lettersLeft.shift())
    }
    setCurrentLetterAnswered(false)
  }

  const getButtonColor = (answer) => {
    if (!currentLetterAnswered) {
      return 'primary'
    } else if (currentLetter === answer) {
      return 'success'
    } else {
      return 'error'
    }
  }

  return (
    <>
      <CssBaseline />
      <Container sx={{padding: 0, paddingRight: 2}}>
        <Box sx={{ marginTop: 6, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h3" align="center">
                {currentLetter.uppercase} {currentLetter.lowercase}
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{padding: 0, paddingRight: 2}}>
              {currentAnswers.map((answer, idx) => (
                <Grid item key={answer.uppercase} xs={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    style={{ textTransform: 'none' }}
                    color={getButtonColor(answer)}
                    onClick={() => submitAnswer(answer, idx)}
                  >
                    {answer.name}
                  </Button>
                </Grid>
              ))}
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={(progress * 100) / cyrillic.length} />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={!currentLetterAnswered} size="large" fullWidth variant="contained" onClick={() => goNext()}>
                  Next
                </Button>
              </Grid>
            </Grid>
            {lettersLeft.length === 0 && currentLetterAnswered && (
              <Typography variant="h4" align="center">
                Congratulations! You've got all the letters right.
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default App
