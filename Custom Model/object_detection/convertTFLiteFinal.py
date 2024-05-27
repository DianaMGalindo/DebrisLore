import os
import subprocess 

paths = {
    'TFLITE_PATH':os.path.join('tfliteExport')  
 }

# Create directories if they don't exist
for path in paths.values():
    if not os.path.exists(path):
        os.makedirs(path)


FROZEN_TFLITE_PATH = os.path.join(paths['TFLITE_PATH'], 'saved_model')
TFLITE_MODEL = os.path.join(paths['TFLITE_PATH'], 'saved_model', 'ssd_mobilenet_v4_1000_fineTune.tflite')

# Construct the command
command = [
    "tflite_convert",
    f"--saved_model_dir={FROZEN_TFLITE_PATH}",
    f"--output_file={TFLITE_MODEL}",
    "--input_shapes=1,320,320,3",
    "--input_arrays=normalized_input_image_tensor",
    "--output_arrays=TFLite_Detection_PostProcess,TFLite_Detection_PostProcess:1,TFLite_Detection_PostProcess:2,TFLite_Detection_PostProcess:3",
    "--inference_type=FLOAT",
    "--allow_custom_ops"
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
    print("TFLite model final conversion successful!")
else:
    print("TFLite model final conversion failed.")