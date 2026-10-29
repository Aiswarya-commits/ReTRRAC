import json
import urllib.request
import sys

sys.stdout.reconfigure(encoding='utf-8')

def test_api(name, url, method="GET", data=None):
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8') if data else None,
            headers={'Content-Type': 'application/json'} if data else {}
        )
        req.get_method = lambda: method
        with urllib.request.urlopen(req, timeout=5) as response:
            res_body = json.loads(response.read().decode('utf-8'))
            print(f" [PASS] {name} ({method} {url}) -> status={response.status}")
            return res_body
    except Exception as e:
        print(f" [FAIL] {name} ({method} {url}) -> Error: {e}")
        return None

print("=== RETRRAC UK FULL-STACK TEST SUITE ===")

# 1. Health
test_api("Health Check", "http://localhost:5000/api/health")

# 2. Courses
courses_res = test_api("Courses Catalog", "http://localhost:5000/api/courses")
if courses_res and 'courses' in courses_res:
    print(f"       -> Total Programs Available: {len(courses_res['courses'])}")
    for c in courses_res['courses']:
        print(f"          • {c['code']}: {c['title']} (£{c['priceGBP']} / ₹{c['priceINR']})")

# 3. Create PayPal Order
order_res = test_api("Create PayPal Order (GBP)", "http://localhost:5000/api/payments/create-paypal-order", method="POST", data={
    "courseId": "cafs-specialist",
    "currency": "GBP"
})
if order_res:
    print(f"       -> PayPal Order ID: {order_res.get('orderId')}, Amount: {order_res.get('currency')} {order_res.get('amount')}")

# 4. Capture PayPal Order
capture_res = test_api("Capture PayPal Order (INR)", "http://localhost:5000/api/payments/capture-paypal-order", method="POST", data={
    "orderId": "PAYID-TEST-001",
    "courseId": "cafs-specialist",
    "currency": "INR",
    "studentName": "Aiswarya Testing",
    "email": "test@retrrac.org",
    "country": "India"
})
if capture_res and 'enrollment' in capture_res:
    enr = capture_res['enrollment']
    print(f"       -> Confirmed Enrollment: {enr['enrollmentId']} for {enr['studentName']} ({enr['currency']} {enr['amountPaid']})")

# 5. Verify Certificate
verify_res = test_api("Verify Digital Certificate", "http://localhost:5000/api/verify/CPD-UK-RETRRAC-2026-8942")
if verify_res:
    print(f"       -> Valid: {verify_res.get('valid')}, Recipient: {verify_res.get('recipient')}, Accreditation: {verify_res.get('accreditation')}")

# 6. Admin Stats
admin_res = test_api("Admin Operations KPIs", "http://localhost:5000/api/admin/stats")
if admin_res and 'stats' in admin_res:
    st = admin_res['stats']
    print(f"       -> Total Revenue: £{st['totalRevenueGBP']} / ₹{st['totalRevenueINR']}, Active Scholars: {st['totalStudents']}")

# 7. AI Advisor
ai_res = test_api("AI Compliance & Course Advisor", "http://localhost:5000/api/ai/advisor", method="POST", data={
    "message": "What is the fee for CAFS certification via PayPal and what does it cover under UK MLR 2017?"
})
if ai_res:
    print(f"       -> AI Advisor Reply: {ai_res.get('reply')[:120]}...")

print("\n=== ALL FULL-STACK API TESTS COMPLETED ===")
