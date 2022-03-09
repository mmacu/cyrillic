import cyrillic from './cyrillic.json'
import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Button, Grid, Paper, Stack, Box, Typography } from '@mui/material'

function App() {
  // const initializeProgress = () =>
  //   cyrillic.map((element) => ({
  //     data: element,
  //     metadata: { delayedUntil: Date.now(), correctAnswers: 0, incorrectAnswers: 0 },
  //   }))

  const [alreadyKnown, setAlreadyKnown] = useState([])

  const getRandomSubarray = (arr, size) => {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  const getAnswers = (correct) => {
    return getRandomSubarray(cyrillic.filter(element => element !== correct), 5)
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ marginTop: 6, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h3" align="center">
                Item
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button variant="outlined" fullWidth>
                  A
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" fullWidth>
                  B
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" fullWidth>
                  C
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" fullWidth>
                  D
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => console.log(getAnswers(cyrillic[0]))} variant="outlined" fullWidth>
                  E
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => console.log('todo')} variant="outlined" fullWidth>
                  F
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default App
