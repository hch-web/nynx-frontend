import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// shared
import ScrollToTop from 'shared/components/ScrollToTop';
import GlobalLoader from '../containers/common/loaders/GloabalLoader';

// Protected Route
const ClientRoute = lazy(() => import('routes/ClientRoute'));
const FreelancerRoute = lazy(() => import('routes/FreelancerRoute'));
const GigRoute = lazy(() => import('routes/GigRoute'));
const CheckoutRoute = lazy(() => import('./CheckoutRoute'));
const PrivateRoute = lazy(() => import('routes/PrivateRoute'));

// Route Components
const Home = lazy(() => import('containers/public-pages/home'));
const HowItWorkClient = lazy(() => import('containers/public-pages/how-it-works/for-clients'));
const HowItWorkFreelancer = lazy(() => import('containers/public-pages/how-it-works/for-freelancer'));
const Login = lazy(() => import('containers/public-pages/auth/login'));
const Signup = lazy(() => import('containers/public-pages/auth/signup'));
const ResetPassword = lazy(() => import('containers/public-pages/auth/reset-password'));
const ForgotPassword = lazy(() => import('containers/public-pages/auth/forgot-password'));
const EmailVerification = lazy(() => import('containers/public-pages/auth/email-verification'));
const NotFound = lazy(() => import('containers/public-pages/misc/404'));
const LayoutWrapper = lazy(() => import('containers/common/layout'));
const FindServices = lazy(() => import('containers/public-pages/find-services'));
const CreateGigForm = lazy(() => import('containers/public-pages/create-gig-form'));
const WhyPage = lazy(() => import('containers/public-pages/why-page'));
const SingleService = lazy(() => import('containers/public-pages/services/single-service'));
const FreelancerProfile = lazy(() => import('containers/public-pages/freelancer-profile'));
const GigDetails = lazy(() => import('containers/public-pages/gig-details'));
const AccountActivation = lazy(() => import('containers/public-pages/auth/account-activation'));
const AgainActivateAccount = lazy(() => import('containers/public-pages/auth/again-activate-account'));
const ContactUs = lazy(() => import('containers/public-pages/contact-us'));
const AddTemplate = lazy(() => import('containers/public-pages/freelancer-profile/components/AddTemplate'));
const ViewTemplates = lazy(() => import('containers/public-pages/freelancer-profile/components/ViewTemplates'));
const EditTemplate = lazy(() => import('containers/public-pages/freelancer-profile/components/EditTemplate'));
const GigCheckout = lazy(() => import('containers/public-pages/gig-checkout'));
const SubmittedProposals = lazy(() => import('containers/public-pages/submitted-proposal'));
const SubmittedProposalDetails = lazy(() => import('containers/public-pages/proposal-details'));
const PrivacyPolicy = lazy(() => import('containers/public-pages/privacy-policy'));
const TermsOfService = lazy(() => import('containers/public-pages/term-of-service'));
const GigSearch = lazy(() => import('containers/public-pages/services/gig-search'));

// Freelancer Portal
const FreelancerDashboard = lazy(() => import('containers/portal/freelancer/dashboard'));
const FreelancerDashboardProfile = lazy(() => import('containers/portal/freelancer/profile'));
const BuyerRequest = lazy(() => import('containers/public-pages/buyer-request'));
const FreelancerWorkSpace = lazy(() => import('containers/portal/freelancer/workspace'));
const FreelancerSingleWorkspace = lazy(() => import('containers/portal/freelancer/workspace/components/SingleWorksaceView'));
const FreelancerChat = lazy(() => import('containers/portal/freelancer/chat'));
const Analytics = lazy(() => import('containers/portal/freelancer/analytics'));

// Client Portal
const ClientDashboard = lazy(() => import('containers/portal/client/dashboard'));
const ClientDashboardProfile = lazy(() => import('containers/portal/client/profile'));
const ClientWorkSpace = lazy(() => import('containers/portal/client/workspace'));
const JobPosting = lazy(() => import('containers/portal/client/workspace/components/JobPosting'));
const SingleWorkspaceView = lazy(() => import('containers/portal/client/workspace/components/SingleWorkspaceView'));
const ClientChat = lazy(() => import('containers/portal/freelancer/chat'));

// TASKS TAB PANEL
const TaskDetails = lazy(() => import('containers/portal/client/workspace/components/workspace-tabs/TaskDetails'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LayoutWrapper />}>
            <Route path="how-it-works-for-clients" element={<HowItWorkClient />} />
            <Route path="how-it-works-for-freelancer" element={<HowItWorkFreelancer />} />
            <Route path="find-service" element={<FindServices />} />
            <Route path="about" element={<WhyPage />} />
            <Route path="freelancer/buyer-request" element={<BuyerRequest />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />

            <Route path="freelancer" element={<GigRoute />}>
              <Route path="gig/create" element={<CreateGigForm />} />
              <Route path="submitted-proposals" element={<SubmittedProposals />} />
              <Route path="submitted-Proposals/:proposalId" element={<SubmittedProposalDetails />} />
            </Route>

            <Route path="/" element={<PrivateRoute />}>
              <Route path="contact-us" element={<ContactUs />} />
            </Route>

            <Route path="profile/:id" element={<FreelancerProfile />} />

            <Route path="services" element={<Outlet />}>
              <Route path=":subCategoryId" element={<SingleService />} />
              <Route path="gigs" element={<GigSearch />} />
            </Route>

            <Route path="profile/:profileId/gig/:gigId" element={<GigDetails />} />

            <Route path="template/:id" element={<Outlet />}>
              <Route path="add" element={<AddTemplate />} />
              <Route path="edit/:tempId" element={<EditTemplate />} />
              <Route path="view" element={<ViewTemplates />} />
            </Route>

            <Route path="auth" element={<Outlet />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="reset-password/:activationKey" element={<ResetPassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="verify-email" element={<EmailVerification />} />
              <Route path="account-verified/:activationToken" element={<AccountActivation />} />
              <Route path="activate-account/:activationToken" element={<AgainActivateAccount />} />
              <Route index element={<Navigate to="/auth/login" />} />
            </Route>

            <Route path="portal" element={<Outlet />}>
              <Route path="freelancer" element={<FreelancerRoute />}>
                <Route path="dashboard" element={<FreelancerDashboard />} />
                <Route path="profile-setting" element={<FreelancerDashboardProfile />} />
                <Route path="chat" element={<FreelancerChat />} />
                <Route path="analytics" element={<Analytics />} />

                <Route path="workspace" element={<Outlet />}>
                  <Route path=":workspaceId" element={<FreelancerSingleWorkspace />} />
                  <Route index element={<FreelancerWorkSpace />} />
                </Route>

                <Route index element={<Navigate to="/portal/pages/freelancer/dashboard" />} />
              </Route>

              <Route path="client" element={<ClientRoute />}>
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path="chat" element={<ClientChat />} />
                <Route path="profile-setting" element={<ClientDashboardProfile />} />

                <Route path="workspace" element={<Outlet />}>
                  <Route path=":workspaceId" element={<SingleWorkspaceView />} />
                  <Route path="create" element={<JobPosting />} />
                  <Route path="edit/:id" element={<JobPosting />} />
                  <Route path="job/create" element={<JobPosting />} />
                  <Route index element={<ClientWorkSpace />} />
                </Route>
              </Route>

              <Route path="workspace/:workspaceId/task/:taskId/:taskVia" element={<TaskDetails />} />
            </Route>

            <Route path="payment" element={<CheckoutRoute />}>
              <Route path="checkout" element={<GigCheckout />} />
            </Route>

            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
