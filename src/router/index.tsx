import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PublicLayout } from '../components/layout/PublicLayout';
import { HomePage } from '../pages/HomePage';
import { SchedulePage } from '../pages/SchedulePage';
import { NewsEditorPage } from '../pages/NewsEditorPage';
import { DashboardPage } from '../pages/DashboardPage';
import { StudentRecordsPage } from '../pages/StudentRecordsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ResearchPage } from '../pages/ResearchPage';
import { FacultyPage } from '../pages/FacultyPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { 
  RecruitmentPage, 
  DepartmentsInfoPage, 
  ResearchInfoPage, 
  NewsInfoPage, 
  AboutPage, 
  ContactPage 
} from '../pages/PublicInfoPages';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'recruitment',
        element: <RecruitmentPage />
      },
      {
        path: 'departments-info',
        element: <DepartmentsInfoPage />
      },
      {
        path: 'research-info',
        element: <ResearchInfoPage />
      },
      {
        path: 'news-info',
        element: <NewsInfoPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
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
    ]
  }
]);
