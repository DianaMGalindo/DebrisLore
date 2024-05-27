import tensorflowjs
import os
import subprocess 
paths = {
    'OUTPUT_PATH': os.path.join('inference_graph', 'saved_model'), 
    'TFJS_PATH':os.path.join('tfjsexport'), 
 }

# Create directories if they don't exist
for path in paths.values():
    if not os.path.exists(path):
        os.makedirs(path)

#command = "tensorflowjs_converter --input_format=tf_saved_model --output_node_names='detection_boxes,detection_classes,detection_features,detection_multiclass_scores,detection_scores,num_detections,raw_detection_boxes,raw_detection_scores' --output_format=tfjs_graph_model --signature_name=serving_default {} {}".format(os.path.join(paths['OUTPUT_PATH']), paths['TFJS_PATH'])
#print(command)
command = [
    "tensorflowjs_converter",
    "--input_format=tf_saved_model",
    "--output_node_names=detection_boxes,detection_classes,detection_features,detection_multiclass_scores,detection_scores,num_detections,raw_detection_boxes,raw_detection_scores",
    "--output_format=tfjs_graph_model",
    "--signature_name=serving_default",
    os.path.join(paths['OUTPUT_PATH']),
    paths['TFJS_PATH']
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
    print("Model conversion successful!")
else:
    print("Model conversion failed.")