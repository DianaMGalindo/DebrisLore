import os
import subprocess 


#models/research/object_detection/export_tflite_graph_tf2.py
#Checkpoints have been saved on a different folder 
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

     
# Define the correct TFLite export script path
TFLITE_SCRIPT = os.path.join('export_tflite_graph_tf2.py')
# Construct the command
command = [
    "python",
    TFLITE_SCRIPT,
    f"--pipeline_config_path={paths['PIPELINE_CONFIG']}",
    f"--trained_checkpoint_dir={paths['CHECKPOINT_PATH']}",
    f"--output_directory={paths['TFLITE_PATH']}"
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
    print("TFLite model export successful!")
else:
    print("TFLite model export failed.")