// BitBeetle — Mock conversation data

const MOCK_CONVERSATIONS = [
  {
    id: 'BB-00001',
    contact: { name: 'Jordi Lagunilla', initials: 'JL', email: 'jordi@vipdistrict.com', role: 'CTO', color: '#000ce1' },
    company: 'Vip District',
    plan: 'Growth',
    channel: 'Email',
    status: 'AI Handling',
    sla: 'On track',
    preview: 'Getting 500 errors after today\'s deploy…',
    time: '2m',
    unread: true,
    topics: ['bug', 'deploy', 'production'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'Hi, we\'re getting 500 errors on our checkout flow after today\'s deployment around 14:30. It seems to be affecting about 30% of transactions. Can you help us diagnose this quickly?',
        time: '14:35'
      }
    ]
  },
  {
    id: 'BB-00002',
    contact: { name: 'Carlos Falo', initials: 'CF', email: 'carlos@coniq.com', role: 'CTO', color: '#ff5600' },
    company: 'Coniq',
    plan: 'Scale',
    channel: 'Slack',
    status: 'Escalated',
    sla: 'At risk',
    preview: 'The webhook integration isn\'t firing for…',
    time: '18m',
    unread: false,
    topics: ['webhook', 'integration'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'The webhook integration isn\'t firing for new loyalty transactions in our production environment. It was working fine yesterday. We\'ve checked our endpoint and it\'s receiving nothing.',
        time: '14:20'
      },
      {
        id: 2, role: 'assistant', type: 'ai',
        content: 'I\'ve reviewed your webhook configuration. The issue appears to be related to a recent update to event payload schemas. I\'m escalating this to the engineering team with a full diagnostic context including your webhook endpoint logs and the recent schema changes.',
        time: '14:21'
      },
      {
        id: 3, role: 'user', type: 'customer',
        content: 'Thanks, how long will this take? We have a major campaign launching in 2 hours.',
        time: '14:22'
      }
    ]
  },
  {
    id: 'BB-00003',
    contact: { name: 'Ferran Caellas', initials: 'FC', email: 'ferran@altima.com', role: 'Engineering Lead', color: '#00edc8' },
    company: 'Altima SaaS',
    plan: 'Growth',
    channel: 'Teams',
    status: 'AI Handling',
    sla: 'On track',
    preview: 'Can we export the analytics data as CSV?',
    time: '34m',
    unread: false,
    topics: ['export', 'analytics', 'feature'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'Hi team, is there a way to export the analytics data as CSV? We need to bring it into our internal BI tool for quarterly reporting.',
        time: '14:04'
      }
    ]
  },
  {
    id: 'BB-00004',
    contact: { name: 'Maria Torres', initials: 'MT', email: 'maria@datasync.io', role: 'Head of Operations', color: '#7c3aed' },
    company: 'DataSync',
    plan: 'Growth',
    channel: 'Email',
    status: 'Open',
    sla: 'On track',
    preview: 'Account provisioning failing for new users',
    time: '1h',
    unread: true,
    topics: ['provisioning', 'auth'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'We\'re onboarding 12 new team members this week and account provisioning is failing for all of them. They receive the invite email but clicking "Accept" gives a 404 error. This is blocking our go-live.',
        time: '13:38'
      }
    ]
  },
  {
    id: 'BB-00005',
    contact: { name: 'Pau Vilagrasa', initials: 'PV', email: 'pau@signaturit.com', role: 'Senior Developer', color: '#ff5600' },
    company: 'Signaturit',
    plan: 'Growth',
    channel: 'Slack',
    status: 'Open',
    sla: 'On track',
    preview: 'Need to integrate with Salesforce, docs unclear',
    time: '2h',
    unread: false,
    topics: ['integration', 'salesforce', 'docs'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'I\'m trying to set up the Salesforce CRM integration following your docs, but section 3.2 references an "OAuth callback URL" that doesn\'t seem to exist in our Salesforce setup. Is there an updated guide?',
        time: '12:45'
      }
    ]
  },
  {
    id: 'BB-00006',
    contact: { name: 'Ana Ribas', initials: 'AR', email: 'ana@factorial.co', role: 'Finance Manager', color: '#1bb157' },
    company: 'Factorial',
    plan: 'Free',
    channel: 'Email',
    status: 'Resolved',
    sla: 'On track',
    preview: 'Billing cycle discrepancy this month',
    time: '3h',
    unread: false,
    topics: ['billing'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'There\'s a discrepancy in our billing this month — we were charged for 8 seats but we only have 6 active users. Can you look into this?',
        time: '11:30'
      },
      {
        id: 2, role: 'assistant', type: 'ai',
        content: 'I\'ve reviewed your account and found the issue. Two deactivated users from last month were not fully removed from your billing cycle due to a timing issue with the monthly snapshot. I\'ve applied a credit of €98 to your account which will appear on your next invoice.',
        time: '11:31'
      },
      {
        id: 3, role: 'user', type: 'customer',
        content: 'Perfect, thank you for the quick resolution!',
        time: '11:45'
      },
      {
        id: 4, role: 'assistant', type: 'agent',
        content: 'Happy to help! The credit has been applied. Please don\'t hesitate to reach out if you have any other questions.',
        time: '11:50'
      }
    ]
  },
  {
    id: 'BB-00007',
    contact: { name: 'Marco Bianchi', initials: 'MB', email: 'marco@nexo.io', role: 'Backend Engineer', color: '#000ce1' },
    company: 'Nexo',
    plan: 'Growth',
    channel: 'Teams',
    status: 'AI Handling',
    sla: 'On track',
    preview: 'API rate limiting happening unexpectedly',
    time: '4h',
    unread: false,
    topics: ['api', 'rate-limit', 'performance'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'We\'re hitting rate limits on the `/transactions` endpoint despite being well within our plan\'s stated limits (500 req/min). Our monitoring shows we\'re averaging 180 req/min. Is there a burst limit we\'re not aware of?',
        time: '10:15'
      }
    ]
  },
  {
    id: 'BB-00008',
    contact: { name: 'Sara Molina', initials: 'SM', email: 'sara@cobee.io', role: 'IT Manager', color: '#fd3a57' },
    company: 'Cobee',
    plan: 'Scale',
    channel: 'Email',
    status: 'Escalated',
    sla: 'At risk',
    preview: 'SSO login failing for users in our Madrid office',
    time: '5h',
    unread: false,
    topics: ['sso', 'auth', 'office'],
    messages: [
      {
        id: 1, role: 'user', type: 'customer',
        content: 'Users in our Madrid office (approximately 40 people) are unable to log in via SSO since this morning. Users in other offices are unaffected. We use Okta as our IdP. Error: "SAML assertion validation failed".',
        time: '09:00'
      },
      {
        id: 2, role: 'assistant', type: 'ai',
        content: 'This looks like a SAML certificate rotation issue. Okta may have rotated the signing certificate and the service provider metadata wasn\'t updated. I\'m escalating with full SAML trace logs and the current certificate fingerprint mismatch details.',
        time: '09:01'
      }
    ]
  }
];

// Channel color map
const CHANNEL_COLORS = {
  'Email': 'badge-blue',
  'Slack': 'badge-orange',
  'Teams': 'badge-teal'
};

// Status color map
const STATUS_COLORS = {
  'AI Handling': 'badge-blue',
  'Escalated': 'badge-error',
  'Open': 'badge-default',
  'Resolved': 'badge-success'
};

// Plan color map
const PLAN_COLORS = {
  'Free': 'badge-default',
  'Growth': 'badge-teal',
  'Scale': 'badge-orange'
};
