export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'home',
        'link': false,
        'open': false,
        'chip': { 'value': 1, 'color': 'accent' },
      
    },
    {
        'name': 'Etats',
        'icon': 'folder',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Clients',
                'link': 'dash/client/list',
                'icon': 'perm_contact_calendar',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Reclamations',
                'link': 'dash/chat',
                'icon': 'account_balance',
                'chip': false,
                'open': false,
            }   
            ,
            {
                'name': 'Send Message',
                'link': 'material-widgets/list',
                'icon': 'send',
                'chip': false,
                'open': false,
            }   
          
           
        ]
    },
    
    {
        'name': 'Creances',
        'icon': 'list',
        'link': false,
        'open': false,
        'chip': { 'value': 2, 'color': 'accent' },
        'sub': [
            
        ]

    },
    
   
];
