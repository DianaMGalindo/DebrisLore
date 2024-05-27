import os
import subprocess 

paths = {
    #'APIMODEL_PATH':os.path.join('models'),
    'PIPELINE_CONFIG':os.path.join('inference_graph', 'pipeline.config'),
    'CHECKPOINT_PATH': os.path.join('training'),
    'TFLITE_PATH':os.path.join('tfliteExport')  
 }

# Create directories if they don't exist
for path in paths.values():
    if not os.path.exists(path):
        os.makedirs(path)

TRAINING_SCRIPT = os.path.join('model_main_tf2.py')

# Construct the command
command = [
    "python",
    TRAINING_SCRIPT,
    f"--model_dir={paths['CHECKPOINT_PATH']}",
    f"--pipeline_config_path={paths['PIPELINE_CONFIG']}",
    f"--checkpoint_dir={paths['CHECKPOINT_PATH']}"
]

# Print the command for debugging purposes
print("Running command:", ' '.join(command))

# Execute the command
result = subprocess.run(command, capture_output=True, text=True)

# Print the output and errors (if any)
print("stdout:", result.stdout)
print("stderr:", result.stderr)

# Check if the command was successful
if result.returncode == 0:
    print("Model evaluation successful!")
else:
    print("Model evaluation failed.")