import cyrillic from './cyrillic.json'
import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Button, Grid, Paper, Stack, Box, Typography } from '@mui/material'

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
      6
    )
    const randomIdx = getRandomInt(answers.length - 1)
    answers[randomIdx] = currentLetter
    return answers
  }

  const [allLetters, setAllLetters] = useState(cyrillic)
  const [lettersLeft, setLettersLeft] = useState(cyrillic)
  const [currentLetter, setCurrentLetter] = useState(cyrillic[0])
  const [currentAnswers, setCurrentAnswers] = useState(getAnswers(cyrillic[0]))
  const [showNextButton, setShowNextButton] = useState(false)
  const [userAnswer, setUserAnswer] = useState(null)

  useEffect(() => {
    lettersLeft.shift()
  }, [])

  useEffect(() => {
    setCurrentAnswers(getAnswers(currentLetter))
  }, [currentLetter])

  const submitAnswer = (answer) => {
    if (showNextButton) {
      return
    }
    setShowNextButton(true)
    if (answer !== currentLetter) {
      lettersLeft.push(currentLetter)
    } 
  }

  const goNext = () => {
    setCurrentLetter(lettersLeft.shift())
    setShowNextButton(false)
  }

  const getButtonColor = (answer) => {
    if (!showNextButton) {
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
      <Container>
        <Box sx={{ marginTop: 6, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h3" align="center">
                {currentLetter.uppercase}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {currentAnswers.map((answer, idx) => (
                <Grid item key={answer.uppercase} xs={4}>
                  <Button variant="outlined" fullWidth style={{textTransform: 'none'}} color={getButtonColor(answer)} onClick={() => submitAnswer(answer, idx)}>
                    {answer.name}
                  </Button>
                </Grid>
              ))}
                <Grid item xs={12}>
                  <Button disabled={!showNextButton} size='large' fullWidth variant='contained' onClick={() => goNext()}>Next</Button>
                </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default App
