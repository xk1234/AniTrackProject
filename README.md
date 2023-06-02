# AniTrack

AniTrack is an open-source show tracking service that lets you easily keep track of all the shows you've watched and plan to watch.

## Features

- **Watched Shows**: Easily browse through your watched shows. Supports pagination, search, and filtering to make finding your favorite shows a breeze.

- **Authentication**: Secure user authentication with JWT. Your login is saved, so you don't have to re-enter your credentials every time you visit.

- **Responsive UI**: A clean and modern user interface that works well on all device sizes.

- **Data Tracking**: Keep track of how many episodes you've watched. Easily increment or decrement the episode count, or even mark the show as completely watched.

## Technologies Used

### Frontend
- React and Redux
- HTML, CSS, JS

### Backend
- SQL, PostgreSQL, Supabase

### CI/CD
- Netlify
- Github

### API
- GraphQL

## Building

1. Clone this repository: 
    \```bash
    git clone https://github.com/xk1234/AniTrack.git
    \```
2. Enter the cloned repository:
    \```bash
    cd AniTrack
    \```
3. Install dependencies:
    \```bash
    npm install
    \```
4. Fill in your Supabase token into `supabaseClient.js`:
    \```javascript
    import { createClient } from "@supabase/supabase-js";

    export const supabase = createClient(
    "DATABASE_URL",
    "API_KEY"
    );
    \```
5. Start the application:
    \```bash
    npm run start
    \```
The app will start in development mode, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

As an open-source project, we welcome contributions of all sorts. Whether it's submitting a bug report, suggesting new features, improving documentation, or contributing code, we appreciate all the help we can get! Please read `CONTRIBUTING.md` for guidelines on how to contribute.

## License

AniTrack is licensed under the MIT License. See `LICENSE` for more information.
