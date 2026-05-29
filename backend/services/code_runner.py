import subprocess
import uuid
import os

def run_python_code(code):

    filename = f"{uuid.uuid4()}.py"

    with open(filename, "w") as file:

        file.write(code)

    try:

        result = subprocess.run(
            ["python", filename],
            capture_output=True,
            text=True,
            timeout=5
        )

        output = result.stdout

        error = result.stderr

        os.remove(filename)

        return {
            "output": output,
            "error": error
        }

    except Exception as e:

        return {
            "output":"",
            "error":str(e)
        }