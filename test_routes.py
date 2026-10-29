import urllib.request

routes = [
  '/', 
  '/our-story', 
  '/compliance-consulting', 
  '/compliance-consulting/banks-financial-institutions', 
  '/compliance-consulting/accountants-and-bookkeepers',
  '/compliance-consulting/lawyers-and-solicitors',
  '/retrrac-academy',
  '/courses/certified-anti-financial-crime-specialist-cafs',
  '/blackthrone-training',
  '/clients-lifecycle-management',
  '/knowledge-hub',
  '/our-success-stories',
  '/internship-career',
  '/contact'
]

print("Testing live dev server routes:")
for r in routes:
    try:
        url = 'http://localhost:3000' + r
        resp = urllib.request.urlopen(url, timeout=3)
        print(f"  [OK] {r} -> HTTP {resp.status}")
    except Exception as e:
        print(f"  [ERROR] {r} -> Error: {e}")
