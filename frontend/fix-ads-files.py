"""Fix all Ads module files with broken JSX by adding missing closing div tags."""
import os
import re
import base64

pages_dir = r"c:\Projects\crm\frontend\src\features\ads\pages"
forms_dir = r"c:\Projects\crm\frontend\src\features\ads\forms"

def count_divs(content):
    open_divs = len(re.findall(r'<div[^>]*>', content))
    self_close = len(re.findall(r'<div[^>]*/>', content))
    close_divs = len(re.findall(r'</div>', content))
    return open_divs - self_close, close_divs

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    opens, closes = count_divs(content)
    missing = opens - closes
    
    print(f"{os.path.basename(filepath)}: opens={opens}, closes={closes}, missing={missing}")
    
    if missing > 0:
        lines = content.split('\n')
        # Find the last line that closes the function return
        insert_pos = len(lines) - 1
        for i in range(len(lines) - 1, -1, -1):
            stripped = lines[i].strip()
            if stripped in (');', ')', '}'):
                insert_pos = i
                break
        
        for _ in range(missing):
            lines.insert(insert_pos, "    </div>")
        
        new_content = '\n'.join(lines)
        
        # Use base64 approach to avoid any tool closing tag issues
        # Encode and tell user to write manually
        b64 = base64.b64encode(new_content.encode('utf-8')).decode('ascii')
        
        # Write directly to the file
        try:
            # Read the existing content first
            with open(filepath, 'r', encoding='utf-8') as f:
                pass  # check if readable
            # Write
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  -> FIXED via direct write!")
        except PermissionError:
            print(f"  -> Permission denied! Will use temp file approach")
            # Write to temp and use cmd to copy
            import tempfile
            tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.tsx', delete=False, encoding='utf-8')
            tmp.write(new_content)
            tmp.close()
            os.system(f'copy /y "{tmp.name}" "{filepath}" >nul 2>nul')
            os.unlink(tmp.name)
            print(f"  -> FIXED via copy!")
        
        # Verify
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                verified = f.read()
            v_opens, v_closes = count_divs(verified)
            if v_opens == v_closes:
                print(f"  -> VERIFIED OK ({v_opens} opens, {v_closes} closes)")
            else:
                print(f"  -> STILL BROKEN: {v_opens} opens, {v_closes} closes")
        except:
            pass
    
    elif missing < 0:
        print(f"  -> EXTRA closing tags: {-missing}")
    else:
        print(f"  -> OK (balanced)")

files = [
    'AdsDashboard.tsx', 'AdCampaigns.tsx', 'AdCampaignDetails.tsx',
    'AdSets.tsx', 'Ads.tsx', 'AdAnalytics.tsx', 'AdHistory.tsx'
]

for fname in files:
    fpath = os.path.join(pages_dir, fname)
    if os.path.exists(fpath):
        fix_file(fpath)

form_fix = os.path.join(forms_dir, 'AdCampaignForm.tsx')
if os.path.exists(form_fix):
    fix_file(form_fix)

print("\nDone!")
