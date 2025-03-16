# Chithram

Chithram is a web application that curates and displays Malayalam videos from YouTube, focusing on categories like Cinema, Food, Music, News, and Technology. The application uses the YouTube Data API to fetch and display trending and popular videos.

## Features

- **Cinema**: Displays full-length Malayalam films.
- **Food**: Shows popular food vlogs and cooking videos.
- **Music**: Lists the latest Malayalam music videos.
- **News**: Provides the latest Malayalam news.
- **Technology**: Features tech podcasts, documentaries, and startup interviews.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dibishks/malayalam-youtube.git
   cd chithram
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   ng serve
   ```

4. **Open in browser**:
   Navigate to `http://localhost:4200/` in your web browser.

## Configuration

- **API Key**: Replace `YOUR_API_KEY` in `src/app/services/youtube.service.ts` with your YouTube Data API key.
- **Environment**: Modify `src/environments/environment.ts` for development settings and `src/environments/environment.prod.ts` for production settings.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
=======
