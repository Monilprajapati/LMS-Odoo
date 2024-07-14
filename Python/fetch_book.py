import requests
import pandas as pd
import random

# Your Google Books API key
API_KEY = 'AIzaSyA5jMiBKTQSSd9Ir_TVdHsMf3-IjJsu51U'

# Function to fetch book data from Google Books API
def fetch_books_data(query, max_results=40):
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&maxResults={max_results}&key={API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Failed to fetch data: {response.status_code}')
        return None

# Function to parse book data
def parse_books_data(data):
    books = []
    if 'items' in data:
        for item in data['items']:
            volume_info = item['volumeInfo']
            industry_identifiers = volume_info.get('industryIdentifiers', [])
            isbn = None
            for identifier in industry_identifiers:
                if identifier['type'] == 'ISBN_13':
                    isbn = identifier['identifier']
                    break
                elif identifier['type'] == 'ISBN_10':
                    isbn = identifier['identifier']

            book = {
                'user_id': random.randint(1, 100),  # Simulated user_id
                'ISBN': isbn,
                'rating': random.randint(1, 5),  # Simulated rating
                'title': volume_info.get('title', 'N/A'),
                'author': ', '.join(volume_info.get('authors', [])),
                'year': volume_info.get('publishedDate', 'N/A').split('-')[0],
                'publisher': volume_info.get('publisher', 'N/A'),
                'image_url': volume_info.get('imageLinks', {}).get('thumbnail', 'N/A'),
                'num_of_rating': volume_info.get('ratingsCount', 0)
            }
            books.append(book)
    return books

# Function to save book data to a CSV file
def save_books_to_csv(books, filename):
    df = pd.DataFrame(books)
    df.to_csv(filename, index=False)
    print(f'Saved {len(books)} books to {filename}')

# Example usage
query = 'python programming'
data = fetch_books_data(query)
if data:
    books = parse_books_data(data)
    save_books_to_csv(books, 'books_data.csv')
