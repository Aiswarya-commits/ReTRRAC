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

print("=== TESTING BOOKINGS & TRACKING SYSTEM ===")

# 1. Fetch Bookings
res = test_api("Get All Bookings", "http://localhost:5000/api/bookings")
assert res and res.get("success") == True
print(f"       -> Total Bookings: {res.get('total')}")

# 2. Create New Booking
new_booking_payload = {
    "bookingId": "BK-UK-2026-9999",
    "studentName": "Sir James Sterling",
    "email": "j.sterling@sterlingchambers.co.uk",
    "phone": "+44 7911 234567",
    "organization": "Sterling Chambers London",
    "country": "United Kingdom",
    "billingAddress": "10 Temple Avenue, London EC4Y 0HP",
    "courses": [
        {
            "courseId": "cafs-specialist",
            "code": "CAFS™",
            "title": "Certified Anti-Financial Crime Specialist",
            "cohort": "July 01, 2026 Cohort",
            "price": 1250,
            "currency": "GBP",
            "cpdPoints": 60
        }
    ],
    "totalAmount": 1250,
    "currency": "GBP",
    "paymentGateway": "PayPal Official",
    "paypalOrderId": "PAYID-TEST-JAMES-99",
    "paymentStatus": "Paid (PayPal Verified)",
    "bookingStatus": "Confirmed",
    "date": "2026-10-06 10:45 BST",
    "lmsAccessGranted": False,
    "certificateIssued": False,
    "timeline": [
        {"step": 1, "title": "Order Placed & PayPal Verified", "desc": "Payment of £1,250 confirmed.", "time": "2026-10-06 10:45 BST", "status": "completed"},
        {"step": 2, "title": "UK Registrar Candidate Verification", "desc": "Registration queued.", "time": "In-Progress", "status": "in-progress"},
        {"step": 3, "title": "LMS Portal & Course Materials Activated", "desc": "Credentials being provisioned.", "time": "Pending", "status": "pending"},
        {"step": 4, "title": "Academic Cohort In-Progress", "desc": "Live lectures starting July 01.", "time": "Pending", "status": "pending"},
        {"step": 5, "title": "CPD UK Accreditation & Certificate Conferred", "desc": "Registry certificate.", "time": "Pending", "status": "pending"}
    ]
}
create_res = test_api("Create Booking (PayPal)", "http://localhost:5000/api/bookings", method="POST", data=new_booking_payload)
assert create_res and create_res.get("success") == True

# 3. Track Booking by ID
track_res = test_api("Track Booking by ID", "http://localhost:5000/api/bookings/BK-UK-2026-9999")
assert track_res and track_res.get("booking")
print(f"       -> Found Booking for: {track_res['booking']['studentName']}, Status: {track_res['booking']['bookingStatus']}")

# 4. Admin Update Status to "Access Granted"
status_res = test_api("Admin Grant LMS Access", "http://localhost:5000/api/bookings/BK-UK-2026-9999/status", method="PUT", data={
    "status": "Access Granted",
    "adminNote": "LMS access credentials dispatched by London Deanery"
})
assert status_res and status_res.get("success") == True
print(f"       -> Updated Status: {status_res['booking']['bookingStatus']}, LMS Granted: {status_res['booking']['lmsAccessGranted']}")

print("\n=== BOOKINGS & TRACKING TEST COMPLETE: ALL PASSED ===")
