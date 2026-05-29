from gtts import gTTS

def generate_voice(text, filename):

    tts = gTTS(
        text=text,
        lang='en'
    )

    tts.save(filename)