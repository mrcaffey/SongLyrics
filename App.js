import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios'

const BASE_URL = 'https://api.lyrics.ovh/v1/'

export default class App extends React.Component {
  state = { artist: '', title: '', lyrics: '' }

  strip = (str) => {
    return str.replace(' ', '%20')
  }

  getLyrics = () => {
    const { artist, title } = this.state
    axios.get(`${BASE_URL}${this.strip(artist)}/${this.strip(title)}`)
      .then( ({ data }) => {
        this.setState({ title: '', artist: '', lyrics: data.lyrics })
      }).catch( err => {
        const lyrics = `Could not find song ${title} by ${artist}`
        this.setState({ lyrics })
      })
  }

  render() {
    const { artist, title, lyrics } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>NativeLyrics</Text>
        <Text style={styles.label}>Artist</Text>
        <TextInput
          value={artist}
          style={styles.input}
          onChangeText={ (text) => this.setState({ artist: text }) }
        />
        <Text style={styles.label}>Track Title</Text>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={ (text) => this.setState({ title: text }) }
        />
        { (artist !== '' && title !== '') &&
            <TouchableOpacity onPress={this.getLyrics}>
              <Text style={styles.button}>
                Get Lyrics
              </Text>
            </TouchableOpacity>
        }
        <ScrollView style={ lyrics ? styles.lyrics : {} }>
          <Text style={styles.lyricText}>{lyrics}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lyrics: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  lyricText: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#50C878',
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: 5,
  },
  input: {
    height: 50,
    fontSize: 25,
    borderColor: 'tan',
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
  },
  button: {
    height: 50,
    alignSelf: 'center',
    paddingTop: 30,
  }
});
