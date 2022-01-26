FROM python:3
COPY . .
RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_sm
RUN python -m spacy download en_core_web_md
EXPOSE 5000
CMD ["python", "app.py"]