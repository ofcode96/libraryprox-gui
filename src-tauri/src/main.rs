// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use gethostname::gethostname;

// use tauri::api::path::app_local_data_dir;
use tauri::api::process::Command;
// use tauri::api::process::CommandEvent;
use tauri::Manager;

#[tauri::command]
fn get_host_name() -> String {
    format!("{:?}", gethostname()).into()
}

fn distroy_sidecar() {
    let output = Command::new("taskkill")
        .args(&["/IM", "main.exe", "/F"])
        .output()
        .expect("Failed to kill sidecar process");

    if !output.status.success() {
        println!("failed to kill sidecar binary: {:?}", output);
    }
    let output2 = Command::new("taskkill")
        .args(&["/IM", "libraryprox /im main.exe", "/F"])
        .output()
        .expect("Failed to kill sidecar process");

    if !output2.status.success() {
        println!("failed to kill sidecar binary: {:?}", output);
    }
}

#[tauri::command]
fn kill_app() {
    distroy_sidecar()
}

#[tauri::command]
fn kill_server(pid: String) {
    let command = format!("{}", pid);
    runas::Command::new("powershell")
        .arg("powershell")
        .arg("-Command")
        .arg("Stop-Process")
        .arg("-ID ")
        .arg(command)
        .arg("-Force")
        .arg("-WindowStyle hidden")
        .status()
        .unwrap();
}


#[tauri::command]
async fn kill_sidecar() {
// `new_sidecar()` expects just the filename, NOT the whole path like in JavaScript
Command::new_sidecar("runasadmin")
  .expect("failed to create `killtasks` binary command")
  .spawn()
  .expect("Failed to spawn sidecar");
   
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }

    window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();

            let window = app.get_window("main").unwrap();

            tauri::async_runtime::spawn(async move {
                //             let current_dir = std::env::current_dir().unwrap();
                // let current_dir_as_string = current_dir.to_str().unwrap();

                // let command_path = format!(r"{}\main.exe",current_dir_as_string);
                // let command = format!("Start-Process {}  -Verb  runAs",command_path);

                //  runas::Command::new("powershell")
                //  .arg("-Command")
                //  .arg(command)
                //  .arg("-WindowStyle hidden")
                //  .status()
                // .unwrap();

                // let (mut rx, _child) = Command::new_sidecar("main")
                //     .expect("Failed to create `main` binary command")
                //     .spawn()
                //     .expect("Failed to spawn sidecar");
                // while let Some(event) = rx.recv().await {
                //     if let CommandEvent::Stdout(line) = event {
                //         window
                //             .emit("message", Some(format!("'{}'", line)))
                //             .expect("Failed to emit event");
                //     }
                // }

                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(20));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                window.show().unwrap();
            });

            let close_id = app.listen_global("tauri://close-requested", move |_| {
                // Close SideCar Binary
                distroy_sidecar();
                print!("exit")
            });

            app.unlisten(close_id);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_host_name,
            kill_app,
            close_splashscreen,
            kill_server,
            kill_sidecar
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
