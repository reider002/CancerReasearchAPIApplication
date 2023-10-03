from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

app.config.from_object(__name__)

CORS(app, resources={r"/*":{'origins':"*"}})

data = [
    {
        'seqname': 'Seq1',
        'source': 'Source1',
        'feature': 'Feature1',
        # ... Include other columns ...
    },
    {
        'seqname': 'Seq2',
        'source': 'Source2',
        'feature': 'Feature2',
        # ... Include other columns ...
    },
    # Add more data rows as needed
]

#hello world test route
@app.route('/', methods=['GET'])
def get_data():
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)