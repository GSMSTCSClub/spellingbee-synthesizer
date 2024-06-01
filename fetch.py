import os
from google.cloud import texttospeech

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service_account_secret.json'
client = texttospeech.TextToSpeechClient()

text_block = input()

synthesis_input = texttospeech.SynthesisInput(text=text_block)

voice = texttospeech.VoiceSelectionParams(
    language_code = "en-US",
    name = "en-US-Studio-O"
)

audio_config = texttospeech.AudioConfig(
    audio_encoding = texttospeech.AudioEncoding.MP3,
    effects_profile_id = ["small-bluetooth-speaker-class-device"],
    speaking_rate = 1,
    pitch = 1,
)

response = client.synthesize_speech(
    input = synthesis_input,
    voice = voice,
    audio_config = audio_config
)

with open('static/output.mp3', 'wb') as out:
    out.write(response.audio_content)