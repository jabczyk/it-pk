import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { SchedulePage } from '../pages/SchedulePage'
import { NewsEditorPage } from '../pages/NewsEditorPage'
import { DashboardPage } from '../pages/DashboardPage'
import { StudentRecordsPage } from '../pages/StudentRecordsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { ResearchPage } from '../pages/ResearchPage'
import { FacultyPage } from '../pages/FacultyPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/schedule" replace />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'schedule',
        element: <SchedulePage />
      },
      {
        path: 'news-editor',
        element: <NewsEditorPage />
      },
      {
        path: 'records',
        element: <StudentRecordsPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'research',
        element: <ResearchPage />
      },
      {
        path: 'faculty',
        element: <FacultyPage />
      }
    ]
  }
])
