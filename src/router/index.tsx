import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { NewsEditorPage } from '../pages/NewsEditorPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { StudentSchedulePage } from '../pages/StudentSchedulePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'news-editor',
            element: <NewsEditorPage />
          },
          {
            path: 'student-schedule',
            element: <StudentSchedulePage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])
