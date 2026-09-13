# Workspace’i integratsioonid

Integratsioonid ühendavad tenant-portaali Supabase’i, Stripe’i, Resendi, OpenAI, Discordi ja domeeniteenustega. Iga ühendus aktiveeritakse ainult siis, kui vajalik moodul, pakett ja keskkonnaseadistus on olemas. Puuduva integratsiooni korral peab moodul näitama selget unavailable või configuration required olekut, mitte jätkama vigase päringuga.

Discordi ühendus kasutab iga tenanti enda Discordi boti tokenit, mitte Extaasi jagatud boti. Workspace kontrollib tokeniga nähtavaid servereid ja kanaleid, vajalikku kanaliõigust ning hoiab tokenit serveripoolselt; brauserisse tagastatakse ainult seadistuse olek.
